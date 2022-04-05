import { App, H5WasmProvider } from '@h5web/app';
import ReactDOM, { unstable_batchedUpdates } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { State, StoreApi, UseBoundStore } from 'zustand';
import create from 'zustand';

import type { SourceType } from './H5WasmComponent'; // global styles
import './styles.css';

const URL = import.meta.env.VITE_H5WASM_FALLBACK_URL as string;

interface SourceState extends State {
  source?: SourceType;
  setSource: (source: SourceType) => void;
}

export default function H5WasmApp(selector: string) {
  const useStore = create<SourceState>((set) => ({
    setSource: (source: SourceType) => set(() => ({ source })),
  }));

  const setSource = (source: SourceType) => {
    unstable_batchedUpdates(() => {
      useStore.getState().setSource(source);
    });
  };

  ReactDOM.render(
    <H5WasmFunction useStore={useStore} />,
    document.querySelector(selector)
  );
  return setSource;
}

interface Props {
  useStore: UseBoundStore<SourceState, StoreApi<SourceState>>;
}
function H5WasmFunction(props: Props) {
  const { useStore } = props;
  const source = useStore((state) => state.source);

  return (
    <H5WasmProvider source={source}>
      <App />
    </H5WasmProvider>
  );
}
