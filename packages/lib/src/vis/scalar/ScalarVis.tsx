import type { Primitive, PrintableType } from '@h5web/shared';

import styles from './ScalarVis.module.css';

interface Props {
  value: Primitive<PrintableType>;
  formatter: (value: Primitive<PrintableType>) => string;
}

function ScalarVis(props: Props) {
  const { value, formatter } = props;
  return <div className={styles.scalar}>{formatter(value)}</div>;
}

export default ScalarVis;
