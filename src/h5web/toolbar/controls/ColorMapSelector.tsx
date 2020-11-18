import React, { ReactElement } from 'react';
import {
  CYCLICAL,
  DIVERGING,
  INTERPOLATORS,
  MOST_USED,
  MULTI_HUE,
  SINGLE_HUE,
} from '../../visualizations/heatmap/interpolators';
import type { ColorMap } from '../../visualizations/heatmap/models';
import { generateCSSLinearGradient } from '../../visualizations/heatmap/utils';
import Selector from './Selector/Selector';
import styles from './ColorMapSelector.module.css';

const COLORMAP_GROUPS = {
  Common: Object.keys(MOST_USED) as ColorMap[],
  'Single hue': Object.keys(SINGLE_HUE) as ColorMap[],
  'Multi hue': Object.keys(MULTI_HUE) as ColorMap[],
  Cyclical: Object.keys(CYCLICAL) as ColorMap[],
  Diverging: Object.keys(DIVERGING) as ColorMap[],
};

function ColorMapOption(props: { option: ColorMap }): ReactElement {
  const { option } = props;
  const backgroundImage = generateCSSLinearGradient(
    INTERPOLATORS[option],
    'right'
  );
  return (
    <>
      {option}
      <div className={styles.gradient} style={{ backgroundImage }} />
    </>
  );
}

interface Props {
  value: ColorMap;
  disabled?: boolean;
  onChange: (colorMap: ColorMap) => void;
}

function ColorMapSelector(props: Props): ReactElement {
  const { value, disabled, onChange } = props;

  return (
    <Selector
      value={value}
      disabled={disabled}
      onChange={onChange}
      options={COLORMAP_GROUPS}
      optionComponent={ColorMapOption}
    />
  );
}

export default ColorMapSelector;
