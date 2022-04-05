import { App, H5WasmProvider } from '@h5web/app';
import React, { Component, useState } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import styles from './App.module.css';

const URL = import.meta.env.VITE_H5WASM_FALLBACK_URL as string;
export type SourceType = string | File;
const initialPath = 'ncnrdata';
const startFullscreen = false;

interface Props {
  source: SourceType;
  testFunction: () => void;
}

export class H5WasmComponent extends Component<Props> {
  public constructor(props: Props) {
    super(props);
  }
  public render() {
    return (
      <H5WasmProvider source={this.props.source}>
        <App />
      </H5WasmProvider>
    );
  }
}

function H5WasmApp() {
  const query = new URLSearchParams(window.location.search);
  const initial_url = query.get('url') || FILEPATH;
  const [source, setSource] = useState<SourceType>(initial_url);

  const [selectedPath, setSelectedPath] = useState<string>(initialPath);
  const [isExplorerOpen, setExplorerOpen] = useState(!startFullscreen);

  async function do_upload(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    const new_source = files?.[0];
    if (new_source !== undefined) {
      setSource(new_source);
    }
  }

  async function navigate(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value;
    setSource(url);
  }

  return (
    <ReflexContainer className={styles.root} orientation="vertical">
      <ReflexElement
        className={styles.explorer}
        style={{ display: isExplorerOpen ? undefined : 'none' }}
        flex={25}
        minSize={150}
      />

      <ReflexSplitter
        className={styles.splitter}
        style={{ display: isExplorerOpen ? undefined : 'none' }}
      />

      <ReflexElement className={styles.mainArea} flex={75} minSize={500}>
        <H5WasmProvider source={source}>
          <App startFullscreen={query.has('fullscreen')} />
        </H5WasmProvider>
      </ReflexElement>
    </ReflexContainer>
  );
}

export default H5WasmApp;

/*
<div className="reflex-container">
      <div>
        <label id="upload_label">
          file upload:{' '}
          <input
            type="file"
            aria-labelledby="upload_label"
            onChange={do_upload}
          />
        </label>
        <label id="url_label">
          new url:{' '}
          <input
            type="text"
            width="150"
            onChange={navigate}
            aria-labelledby="url_label"
          />
        </label>
      </div>
*/
