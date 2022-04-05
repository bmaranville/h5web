import {
  ready as H5WasmReady,
  File as H5WasmFile,
  FS as H5WasmFS,
} from 'h5wasm';

import type { H5WasmSourceType } from './H5WasmProvider';

const BACKING_FILE = 'current.h5';

function unlinkBackingFile() {
  const { exists } = H5WasmFS.analyzePath(BACKING_FILE);
  if (exists) {
    H5WasmFS.unlink(BACKING_FILE);
  }
}

export function getFilePath(source: H5WasmSourceType): string {
  if (source instanceof File) {
    return source.name;
  }
  return source;
}

const HDF5_MAGIC_NUMBER = new Uint8Array([137, 72, 68, 70, 13, 10, 26, 10]);

function isHDF5(ab: ArrayBuffer): boolean {
  const uint8_view = new Uint8Array(ab.slice(0, HDF5_MAGIC_NUMBER.byteLength));
  return HDF5_MAGIC_NUMBER.every((m, i) => m === uint8_view[i]);
}

export async function fetchSource(
  source: H5WasmSourceType,
  oldFilePromise?: Promise<H5WasmFile>
): Promise<H5WasmFile> {
  if (source === undefined) {
    throw new Error('source is undefined');
  }
  await H5WasmReady;

  let ab: ArrayBuffer;
  if (source instanceof File) {
    ab = await source.arrayBuffer();
  } else {
    const response = await fetch(source);
    ab = await response.arrayBuffer();
  }
  if (!isHDF5(ab)) {
    throw new Error('Not an HDF5 file');
  }
  if (oldFilePromise instanceof Promise) {
    const oldH5WasmFile = await oldFilePromise;
    oldH5WasmFile.close();
  }
  unlinkBackingFile();
  H5WasmFS.writeFile(BACKING_FILE, new Uint8Array(ab), { flags: 'w+' });
  return new H5WasmFile(BACKING_FILE, 'r');
}
