import {
  ready as H5WasmReady,
  File as H5WasmFile,
  FS as H5WasmFS,
} from 'h5wasm';
import type { Group as H5WasmGroup, Dataset as H5WasmDataset } from 'h5wasm';

import type { H5WasmSourceType } from './H5WasmProvider';
import type { H5WasmEntity } from './models';

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

export async function fetchSource(
  source: H5WasmSourceType,
  oldFilePromise?: Promise<H5WasmFile>
): Promise<H5WasmFile> {
  await H5WasmReady;
  if (oldFilePromise instanceof Promise) {
    const oldH5WasmFile = await oldFilePromise;
    oldH5WasmFile.close();
  }
  let ab: ArrayBuffer;
  if (source instanceof File) {
    ab = await source.arrayBuffer();
  } else {
    const response = await fetch(source);
    ab = await response.arrayBuffer();
  }
  unlinkBackingFile();
  H5WasmFS.writeFile(BACKING_FILE, new Uint8Array(ab), { flags: 'w+' });
  return new H5WasmFile(BACKING_FILE, 'r');
}

export function isH5WasmDataset(entity: H5WasmEntity): entity is H5WasmDataset {
  return entity.type === 'Dataset';
}

export function isH5WasmGroup(entity: H5WasmEntity): entity is H5WasmGroup {
  return entity.type === 'Group';
}

export function assertH5WasmDataset(
  entity: H5WasmEntity
): asserts entity is H5WasmDataset {
  if (!isH5WasmDataset(entity)) {
    throw new Error('Expected entity to be H5Wasm dataset');
  }
}
