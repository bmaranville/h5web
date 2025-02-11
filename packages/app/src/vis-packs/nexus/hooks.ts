import type { GroupWithChildren, ScaleType } from '@h5web/shared';
import { isDefined } from '@h5web/shared';
import { useContext } from 'react';

import { ProviderContext } from '../../providers/context';
import { useDatasetValues } from '../core/hooks';
import type { AxisMapping } from '../core/models';
import type { AxisDatasetMapping, NxData } from './models';
import {
  assertNxDataGroup,
  findAssociatedDatasets,
  findErrorsDataset,
  findSignalDataset,
  findTitleDataset,
  getDatasetLabel,
  getSilxStyle,
} from './utils';

export function useNxData(group: GroupWithChildren): NxData {
  const { attrValuesStore } = useContext(ProviderContext);

  assertNxDataGroup(group, attrValuesStore);
  const signalDataset = findSignalDataset(group, attrValuesStore);
  const errorsDataset = findErrorsDataset(group, signalDataset.name);
  const auxDatasets = findAssociatedDatasets(
    group,
    'auxiliary_signals',
    attrValuesStore
  );

  return {
    signalDataset,
    errorsDataset,
    axisDatasets: findAssociatedDatasets(group, 'axes', attrValuesStore),
    titleDataset: findTitleDataset(group),
    silxStyle: getSilxStyle(group, attrValuesStore),
    auxDatasets: auxDatasets.filter(isDefined),
  };
}

export function useAxisMapping(
  mapping: AxisDatasetMapping,
  axisScaleTypes: ScaleType[] | undefined
): AxisMapping {
  const { attrValuesStore } = useContext(ProviderContext);

  const axisValues = useDatasetValues(mapping.filter(isDefined));

  return mapping.map((dataset, i) => {
    return (
      dataset && {
        label: getDatasetLabel(dataset, attrValuesStore),
        value: axisValues[dataset.name],
        scaleType: axisScaleTypes?.[i],
      }
    );
  });
}
