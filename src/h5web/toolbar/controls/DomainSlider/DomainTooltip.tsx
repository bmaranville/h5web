import type { ReactElement } from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import type { Domain } from '../../../../packages/lib';
import { formatValue } from '../../../utils';
import type { DomainErrors } from '../../../vis-packs/core/models';
import ToggleBtn from '../ToggleBtn';
import BoundEditor from './BoundEditor';
import BoundErrorMessage from './BoundErrorMessage';
import styles from './DomainTooltip.module.css';

interface Props {
  id: string;
  open: boolean;
  sliderDomain: Domain;
  dataDomain: Domain;
  errors: DomainErrors;
  isAutoMin: boolean;
  isAutoMax: boolean;
  onAutoMinToggle: () => void;
  onAutoMaxToggle: () => void;
  isEditingMin: boolean;
  isEditingMax: boolean;
  onEditMin: (force: boolean) => void;
  onEditMax: (force: boolean) => void;
  onChangeMin: (val: number) => void;
  onChangeMax: (val: number) => void;
}

function DomainTooltip(props: Props): ReactElement {
  const { id, open, sliderDomain, dataDomain, errors } = props;
  const { isAutoMin, isAutoMax, isEditingMin, isEditingMax } = props;
  const {
    onAutoMinToggle,
    onAutoMaxToggle,
    onEditMin,
    onEditMax,
    onChangeMin,
    onChangeMax,
  } = props;

  const { minGreater: minMaxSwapped, minError, maxError } = errors;

  return (
    <div id={id} className={styles.tooltip} role="tooltip" hidden={!open}>
      <div className={styles.tooltipInner}>
        {minMaxSwapped && (
          <p className={styles.error}>
            Min greater than max
            <br />
            <FiCornerDownRight /> falling back to <strong>data range</strong>
          </p>
        )}

        <BoundEditor
          bound="min"
          value={sliderDomain[0]}
          isEditing={isEditingMin}
          hasError={minMaxSwapped || !!minError}
          onEditToggle={onEditMin}
          onChange={onChangeMin}
        />
        {open && <BoundErrorMessage bound="min" error={minError} />}

        <BoundEditor
          bound="max"
          value={sliderDomain[1]}
          isEditing={isEditingMax}
          hasError={minMaxSwapped || !!maxError}
          onEditToggle={onEditMax}
          onChange={onChangeMax}
        />
        {open && <BoundErrorMessage bound="max" error={maxError} />}

        <p className={styles.dataRange}>
          Data range{' '}
          <span>
            [{' '}
            <abbr title={dataDomain[0].toString()}>
              {formatValue(dataDomain[0])}
            </abbr>{' '}
            ,{' '}
            <abbr title={dataDomain[1].toString()}>
              {formatValue(dataDomain[1])}
            </abbr>{' '}
            ]
          </span>
        </p>

        <p className={styles.autoscale}>
          Autoscale{' '}
          <ToggleBtn
            label="Min"
            raised
            value={isAutoMin}
            onChange={onAutoMinToggle}
          />
          <ToggleBtn
            label="Max"
            raised
            value={isAutoMax}
            onChange={onAutoMaxToggle}
          />
        </p>
      </div>
    </div>
  );
}

export default DomainTooltip;
