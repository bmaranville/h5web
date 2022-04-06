import type { File as H5WasmFile } from 'h5wasm';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
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
        console.log(res);
        setFilePromise(Promise.resolve(res));
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  }, [source]); // eslint-disable-line react-hooks/exhaustive-deps

  const api = useMemo(
    () =>
      filePromise === undefined
        ? null
        : new H5WasmApi(filePromise, getFilePath(source)),
    [filePromise] // eslint-disable-line react-hooks/exhaustive-deps
  );
  console.log(source, filePromise, error);
  if (error !== null) {
    return <div className="error">Error: {error.message}</div>;
  }
  if (api === null) {
    return <div className="error">Error: filePromise is undefined.</div>;
  }
  console.log('rendering Fn...', source, filePromise);

  return <Provider api={api}>{children}</Provider>;
}

interface State {
  api?: H5WasmApi;
  needsFetch: boolean;
  error: unknown;
  prevSource?: H5WasmSourceType;
}

export class H5WasmProviderClass extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { error: null, needsFetch: props.source !== undefined };
  }

  public static getDerivedStateFromProps(props: Props, state: State): State {
    if (props.source !== state.prevSource) {
      return {
        needsFetch: true,
        prevSource: props.source,
        error: null,
      };
    }
    return state;
  }

  public render() {
    if (this.state.needsFetch) {
      void this.loadFilePromise(); // async errors are caught in the method
    }
    if (this.state.error !== null) {
      throw this.state.error;
    }
    if (this.state.api === undefined) {
      return <div className="error">No file loaded</div>;
    }

    return <Provider api={this.state.api}>{this.props.children}</Provider>;
  }

  private async loadFilePromise() {
    const { source } = this.props;
    try {
      const file = await fetchSource(source, this.state.api?.file_promise);
      const api = new H5WasmApi(Promise.resolve(file), getFilePath(source));
      this.setState({
        api,
        error: null,
        needsFetch: false,
      });
    } catch (error) {
      this.setState({ error, needsFetch: false });
    }
  }
}

export default H5WasmProviderClass;
