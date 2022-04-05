import type { File as H5WasmFile } from 'h5wasm';
import type { ReactNode } from 'react';
import { useEffect, useState, Component } from 'react';

import Provider from '../Provider';
import { H5WasmApi } from './h5wasm-api';
import { fetchSource, getFilePath } from './utils';

// H5WasmSourceType:
//  - string indicates URL to load over http
//  - File indicates an item from the FileList of an <input type="file">
//    (for uploading directly)
export type H5WasmSourceType = string | File;

interface Props {
  source: H5WasmSourceType;
  children: ReactNode;
}

function H5WasmProvider(props: Props) {
  const { source, children } = props;
  const [filePromise, setFilePromise] = useState<Promise<H5WasmFile>>();
  const [error, setError] = useState<Error | null>(
    source === undefined ? new Error('source is undefined') : null
  );

  // Need to do cleanup if re-rendering:
  // - closing the existing H5WasmFile object
  // - deleting the backing file in the virtual filesystem (done in fetchSource)
  // but we don't want to update the filePromise on update of filePromise...
  // which is why we leave it out of the dependencies below and
  // need to disable the eslint trigger for that line.
  useEffect(() => {
    fetchSource(source, filePromise)
      .then((res) => {
        setFilePromise(Promise.resolve(res));
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  }, [source]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(source, error);
  if (error !== null) {
    return <div className="error">Error: {error.message}</div>;
  }

  const api = new H5WasmApi(filePromise, getFilePath(source));
  return <Provider api={api}>{children}</Provider>;
}

interface State {
  filePromise: Promise<H5WasmFile>;
}

export class H5WasmProviderClass extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    const filePromise = fetchSource(props.source);
    this.state = { filePromise };
  }

  public static getDerivedStateFromProps(props: Props, state: State): State {
    const filePromise = fetchSource(props.source, state.filePromise);
    return { filePromise };
  }

  public render() {
    const api = new H5WasmApi(
      this.state.filePromise,
      getFilePath(this.props.source)
    );
    return <Provider api={api}>{this.props.children}</Provider>;
  }
}

export default H5WasmProvider;
