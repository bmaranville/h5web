import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { ColorMap } from './models';
import { CustomDomain, Domain, ScaleType } from '../models';
import { useState } from 'react';
import type { ConfigProviderProps } from '../../models';
import createContext from 'zustand/context';

interface HeatmapConfig {
  dataDomain: Domain | undefined;
  setDataDomain: (dataDomain: Domain) => void;

  customDomain: CustomDomain;
  setCustomDomain: (customDomain: CustomDomain) => void;

  colorMap: ColorMap;
  setColorMap: (colorMap: ColorMap) => void;

  invertColorMap: boolean;
  toggleColorMapInversion: () => void;

  scaleType: ScaleType;
  setScaleType: (scaleType: ScaleType) => void;

  keepAspectRatio: boolean;
  toggleAspectRatio: () => void;

  showGrid: boolean;
  toggleGrid: () => void;
}

function initialiseStore(onRehydrated: () => void) {
  return create<HeatmapConfig>(
    persist(
      (set, get) => ({
        dataDomain: undefined,
        setDataDomain: (dataDomain: Domain) => set({ dataDomain }),

        customDomain: [null, null],
        setCustomDomain: (customDomain: CustomDomain) => set({ customDomain }),

        colorMap: 'Viridis',
        setColorMap: (colorMap: ColorMap) => set({ colorMap }),

        invertColorMap: false,
        toggleColorMapInversion: () => {
          set((state) => ({ invertColorMap: !state.invertColorMap }));
        },

        scaleType: ScaleType.Linear,
        setScaleType: (scaleType: ScaleType) => {
          if (scaleType !== get().scaleType) {
            set(() => ({ scaleType, dataDomain: undefined })); // clear `dataDomain` to avoid stale state
          }
        },

        keepAspectRatio: true,
        toggleAspectRatio: () => {
          set((state) => ({ keepAspectRatio: !state.keepAspectRatio }));
        },

        showGrid: false,
        toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
      }),
      {
        name: 'h5web:heatmap',
        whitelist: [
          'customDomain',
          'colorMap',
          'scaleType',
          'keepAspectRatio',
          'showGrid',
          'invertColorMap',
        ],
        version: 6,
        onRehydrateStorage: () => onRehydrated,
      }
    )
  );
}

const { Provider, useStore } = createContext<HeatmapConfig>();
export const useHeatmapConfig = useStore;

// https://github.com/pmndrs/zustand/issues/128#issuecomment-673398578
export function HeatmapConfigProvider(props: ConfigProviderProps) {
  const { children } = props;

  // https://github.com/pmndrs/zustand/issues/346
  const [reydrated, setRehydrated] = useState(false);

  // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [store] = useState(() => {
    return initialiseStore(() => setRehydrated(true));
  });

  return reydrated ? (
    <Provider initialStore={store}>{children}</Provider>
  ) : null;
}
