import type { AnyNumArray, Domain, NumArray, NumericType } from '@h5web/shared';
import {
  getValidDomainForScale,
  ScaleType,
  isDefined,
  formatTick,
  isScaleType,
  isTypedArray,
  getBounds,
  DTypeClass,
} from '@h5web/shared';
import type { Camera } from '@react-three/fiber';
import { scaleLinear, scaleThreshold } from '@visx/scale';
import { tickStep, range } from 'd3-array';
import type { ScaleLinear, ScaleThreshold } from 'd3-scale';
import { clamp } from 'lodash';
import type { IUniform } from 'three';
import { Vector3 } from 'three';

import type { Interactions } from '../interactions/models';
import type {
  Size,
  AxisScale,
  AxisConfig,
  AxisOffsets,
  ScaleGammaConfig,
  VisxScaleConfig,
  VisScaleType,
} from './models';
import { H5WEB_SCALES } from './scales';

export const DEFAULT_DOMAIN: Domain = [0.1, 1];

export const CAMERA_BOTTOM_LEFT = new Vector3(-1, -1, 0);
export const CAMERA_TOP_RIGHT = new Vector3(1, 1, 0);

const AXIS_OFFSETS = { vertical: 72, horizontal: 40, fallback: 16 };

export const DEFAULT_INTERACTIONS: Interactions = {
  Pan: true,
  Zoom: true,
  XAxisZoom: { modifierKey: 'Alt' },
  YAxisZoom: { modifierKey: 'Shift' },
  SelectToZoom: { modifierKey: 'Control' },
};

export const adaptedNumTicks: ScaleLinear<number, number> = scaleLinear({
  domain: [300, 900],
  range: [3, 10],
  clamp: true,
  round: true,
});

const adaptedLogTicksThreshold = scaleLinear({
  domain: [300, 500],
  range: [0.8, 1.4],
});

export function createAxisScale(
  scaleType: VisScaleType,
  config: VisxScaleConfig | ScaleGammaConfig
): AxisScale {
  if (isScaleType(scaleType)) {
    return H5WEB_SCALES[scaleType].createScale(config);
  }

  const [, exponent] = scaleType;
  return H5WEB_SCALES[ScaleType.Gamma].createScale({ ...config, exponent });
}

export function getSizeToFit(
  availableSize: Size,
  ratioToRespect: number | undefined
): Size {
  const { width, height } = availableSize;

  if (!ratioToRespect) {
    return { width, height };
  }

  const availableRatio = width / height;

  return availableRatio > ratioToRespect
    ? { width: height * ratioToRespect, height }
    : { width, height: width / ratioToRespect };
}

export function getDomain(
  valuesArray: AnyNumArray,
  scaleType: ScaleType = ScaleType.Linear,
  errorArray?: AnyNumArray
): Domain | undefined {
  const bounds = getBounds(valuesArray, errorArray);

  return getValidDomainForScale(bounds, scaleType);
}

export function getDomains(
  valuesArrays: AnyNumArray[],
  scaleType: ScaleType = ScaleType.Linear
): (Domain | undefined)[] {
  return valuesArrays.map((arr) => getDomain(arr, scaleType));
}

function extendEmptyDomain(
  value: number,
  extendFactor: number,
  scaleType: ScaleType
): Domain {
  if (scaleType === ScaleType.Log) {
    return [value * 10 ** -extendFactor, value * 10 ** extendFactor];
  }

  if (value === 0) {
    return [-1, 1];
  }

  const extension = Math.abs(value) * extendFactor;
  return [value - extension, value + extension];
}

export function clampBound(
  val: number,
  supportedDomain: Domain = [-Number.MAX_VALUE / 2, Number.MAX_VALUE / 2]
): number {
  const [supportedMin, supportedMax] = supportedDomain;

  return clamp(val, supportedMin, supportedMax);
}

export function extendDomain(
  domain: Domain,
  extendFactor: number,
  scaleType = ScaleType.Linear
): Domain {
  if (extendFactor <= 0) {
    return domain;
  }

  const { validMin } = H5WEB_SCALES[scaleType];

  const [min] = domain;
  if (min < validMin) {
    throw new Error(`Expected domain compatible with ${scaleType} scale`);
  }

  const extendedDomain = unsafeExtendDomain(domain, extendFactor, scaleType);

  return [Math.max(validMin, extendedDomain[0]), extendedDomain[1]];
}

function unsafeExtendDomain(
  domain: Domain,
  extendFactor: number,
  scaleType: ScaleType
): Domain {
  const [min, max] = domain;
  if (min === max) {
    return extendEmptyDomain(min, extendFactor, scaleType);
  }

  const scale = createAxisScale(scaleType, { domain, range: [0, 1] });
  return [scale.invert(-extendFactor), scale.invert(1 + extendFactor)];
}

export function getValueToIndexScale(
  values: number[],
  switchAtMidpoints?: boolean
): ScaleThreshold<number, number> {
  const rawThresholds = switchAtMidpoints
    ? values.map((_, i) => values[i - 1] + (values[i] - values[i - 1]) / 2) // Shift the thresholds for the switch from i-1 to i to happen between values[i-1] and values[i]
    : values; // Else, the switch from i-1 to i will happen at values[i]

  // First threshold (going from 0 to 1) should be for the second value. Scaling the first value should return at 0.
  const thresholds = rawThresholds.slice(1);
  const indices = range(values.length);

  // ScaleThreshold only works with ascending values so the scale is reversed for descending values
  return scaleThreshold<number, number>(
    isDescending(thresholds)
      ? {
          domain: [...thresholds].reverse(),
          range: [...indices].reverse(),
        }
      : { domain: thresholds, range: indices }
  );
}

export function getCanvasScale(
  config: AxisConfig,
  canvasSize: number
): AxisScale {
  const { scaleType, visDomain, flip } = config;
  const range = [-canvasSize / 2, canvasSize / 2];

  return createAxisScale(scaleType ?? ScaleType.Linear, {
    domain: visDomain,
    range: flip ? range.reverse() : range,
  });
}

/**
 * We can't rely on the axis scale's `ticks` method to get integer tick values because
 * `d3.tickStep` sometimes returns incoherent step values - e.g. `d3.tickStep(0, 2, 3)`
 * returns 0.5 instead of 1.
 *
 * So we implement our own, simplified version of `d3.ticks` that always outputs integer values.
 */
export function getIntegerTicks(domain: Domain, count: number): number[] {
  const min = Math.min(...domain);
  const max = Math.max(...domain);
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  const domainLength = intMax - intMin + 1;
  const optimalCount = Math.min(domainLength, count);

  if (optimalCount === 0) {
    return [];
  }

  // Make sure we always use a step that is greater than or equal to 1
  const step = Math.max(tickStep(intMin, intMax, optimalCount), 1);

  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const numTicks = stop - start + 1;

  return Array.from({ length: numTicks }, (_, i) => (start + i) * step);
}

export function getTickFormatter(
  domain: Domain,
  availableSize: number,
  scaleType: ScaleType
): (val: number | { valueOf(): number }) => string {
  if (scaleType !== ScaleType.Log) {
    return formatTick;
  }

  // If available size allows for all log ticks to be rendered without overlap, use default formatter
  const [min, max] = domain[0] > 0 ? domain : [-domain[1], -[domain[0]]];
  const threshold = adaptedLogTicksThreshold(availableSize);
  if (max / min < 10 ** threshold) {
    return formatTick;
  }

  // Otherwise, use formatter that hides non-exact powers of 10
  return (val) => {
    const loggedVal = Math.log10(Math.abs(val.valueOf()));
    return loggedVal === Math.floor(loggedVal) ? formatTick(val) : '';
  };
}

export function getCombinedDomain(
  domains: (Domain | undefined)[]
): Domain | undefined {
  const domainsToCombine = domains.filter(isDefined);
  if (domainsToCombine.length === 0) {
    return undefined;
  }

  return domainsToCombine.reduce((accDomain, nextDomain) => [
    Math.min(accDomain[0], nextDomain[0]),
    Math.max(accDomain[1], nextDomain[1]),
  ]);
}

export function getAxisOffsets(
  hasLabel: Partial<Record<keyof AxisOffsets, boolean>> = {}
) {
  const { horizontal, vertical, fallback } = AXIS_OFFSETS;

  return {
    left: (hasLabel.left ? fallback : 0) + vertical,
    bottom: (hasLabel.bottom ? fallback : 0) + horizontal,
    right: hasLabel.right ? vertical : fallback,
    top: hasLabel.top ? horizontal : fallback,
  };
}

export function isDescending(array: number[]): boolean {
  return array[array.length - 1] - array[0] < 0;
}

export function getAxisDomain(
  axisValues: number[],
  scaleType: ScaleType = ScaleType.Linear,
  extensionFactor = 0
): Domain | undefined {
  const rawDomain = getDomain(axisValues, scaleType);
  if (!rawDomain) {
    return undefined;
  }
  const extendedDomain = extendDomain(rawDomain, extensionFactor, scaleType);
  return isDescending(axisValues)
    ? [extendedDomain[1], extendedDomain[0]]
    : extendedDomain;
}

const TYPE_STRINGS: Record<NumericType['class'], string> = {
  [DTypeClass.Integer]: 'int',
  [DTypeClass.Unsigned]: 'uint',
  [DTypeClass.Float]: 'float',
};

export const VERTEX_SHADER = `
  varying vec2 coords;

  void main() {
    coords = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function formatNumType(numType: NumericType): string {
  return `${TYPE_STRINGS[numType.class]}${numType.size}`;
}

export function getUniforms(
  uniforms: Record<string, unknown>
): Record<string, IUniform> {
  return Object.fromEntries(
    Object.entries(uniforms).map(([key, value]) => [key, { value }])
  );
}

export function getCameraFOV(camera: Camera): {
  topRight: Vector3;
  bottomLeft: Vector3;
} {
  // Unproject from normalized camera space (-1, -1) to (1, 1) to world space
  const topRight = CAMERA_TOP_RIGHT.clone().unproject(camera);
  const bottomLeft = CAMERA_BOTTOM_LEFT.clone().unproject(camera);

  return { topRight, bottomLeft };
}

export function toArray(arr: NumArray): number[] {
  return isTypedArray(arr) ? [...arr] : arr;
}
