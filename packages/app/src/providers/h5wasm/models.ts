import type { Shape } from '@h5web/shared';
import type {
  Group as H5WasmGroup,
  Dataset as H5WasmDataset,
  BrokenSoftLink as H5WasmBrokenSoftLink,
  ExternalLink as H5WasmExternalLink,
} from 'h5wasm';

export type H5WasmEntity =
  | H5WasmGroup
  | H5WasmDataset
  | H5WasmBrokenSoftLink
  | H5WasmExternalLink;

export interface H5WasmAttribute {
  value: unknown;
  shape: Shape;
  dtype: string;
}
