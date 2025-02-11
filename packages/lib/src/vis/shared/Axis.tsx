import type { Domain } from '@h5web/shared';
import { ScaleType } from '@h5web/shared';
import type { SharedAxisProps } from '@visx/axis';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
import type { ElementType } from 'react';

import type { Size, AxisConfig, AxisScale } from '../models';
import {
  adaptedNumTicks,
  getIntegerTicks,
  getTickFormatter,
  createAxisScale,
} from '../utils';
import styles from './AxisSystem.module.css';
import Tick from './Tick';

const AXIS_PROPS: Partial<SharedAxisProps<AxisScale>> = {
  labelClassName: styles.label,
  labelProps: {}, // remove any styling props from parent `svg` element
  tickClassName: styles.tick,
  tickComponent: Tick,
};

const COMPONENTS: Record<string, [ElementType, ElementType]> = {
  abscissa: [AxisBottom, GridColumns],
  ordinate: [AxisLeft, GridRows],
};

interface Props {
  type: 'abscissa' | 'ordinate';
  config: AxisConfig;
  domain: Domain;
  canvasSize: Size;
  svgSize: Size;
  flipAxis?: boolean;
}

function Axis(props: Props) {
  const { type, config, domain, canvasSize, svgSize, flipAxis } = props;

  const { width, height } = canvasSize;
  const axisLength = type === 'abscissa' ? width : height;

  const { scaleType = ScaleType.Linear, isIndexAxis, showGrid, label } = config;
  // Restrain ticks scales to visible domains
  const scale = createAxisScale(scaleType, {
    domain,
    range: flipAxis ? [axisLength, 0] : [0, axisLength],
  });

  const [AxisComponent, GridComponent] = COMPONENTS[type];

  const numTicks = adaptedNumTicks(axisLength);
  const ticksProp = isIndexAxis
    ? { tickValues: getIntegerTicks(domain, numTicks) }
    : { numTicks };

  return (
    <>
      <svg className={styles.axis} style={svgSize} data-type={type}>
        <AxisComponent
          scale={scale}
          tickFormat={getTickFormatter(domain, axisLength, scaleType)}
          label={label}
          labelOffset={type === 'abscissa' ? 28 : 42}
          hideAxisLine={showGrid}
          {...ticksProp}
          {...AXIS_PROPS}
        />
      </svg>
      {showGrid && (
        <svg className={styles.grid} style={canvasSize}>
          <GridComponent
            scale={scale}
            width={width}
            height={height}
            {...ticksProp}
          />
        </svg>
      )}
    </>
  );
}

export default Axis;
