import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './styles.css'; // global styles

import H5WasmApp from './Browser';

ReactDOM.render(
  <StrictMode>
    <H5WasmApp />
  </StrictMode>,
  document.querySelector('#root')
);
