import { createContext } from 'react';
import type { AxisConfig } from './models';

export interface AxisConfigs {
  abscissaConfig: AxisConfig;
  ordinateConfig: AxisConfig;
}

export default createContext<AxisConfigs>({} as AxisConfigs);
