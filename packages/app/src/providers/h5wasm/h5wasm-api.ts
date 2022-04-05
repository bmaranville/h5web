import type {
  Attribute,
  AttributeValues,
  Dataset,
  Entity,
  Group,
  GroupWithChildren,
  UnresolvedEntity,
} from '@h5web/shared';
import {
  assertStr,
  buildEntityPath,
  EntityKind,
  hasScalarShape,
  isDataset,
  isGroup,
} from '@h5web/shared';
import type { File as H5WasmFile } from 'h5wasm';
import {
  BrokenSoftLink as H5WasmBrokenSoftLink,
  Dataset as H5WasmDataset,
  ExternalLink as H5WasmExternalLink,
  Group as H5WasmGroup,
} from 'h5wasm';

import { ProviderApi } from '../api';
import type { ValuesStoreParams } from '../models';
import { convertDtype } from '../utils';
import type { H5WasmAttribute, H5WasmEntity } from './models';
import { assertH5WasmDataset, isH5WasmDataset, isH5WasmGroup } from './utils';

export class H5WasmApi extends ProviderApi {
  /* API compatible with h5wasm@0.3.1 */

  public file_promise: Promise<H5WasmFile>;

  public constructor(file_promise: Promise<H5WasmFile>, filepath: string) {
    super(filepath);
    this.file_promise = file_promise;
  }

  public async getEntity(path: string): Promise<Entity> {
    const file = await this.file_promise;
    const entity_obj = file.get(path);
    return this.processEntityObject(path, path, entity_obj, true);
  }

  public async getValue(params: ValuesStoreParams): Promise<unknown> {
    const { dataset } = params;
    const file = await this.file_promise;
    const dataset_obj = file.get(dataset.path);
    assertH5WasmDataset(dataset_obj);
    const array = dataset_obj.value;
    return hasScalarShape(dataset) ? array[0] : array;
  }

  public async getAttrValues(entity: Entity): Promise<AttributeValues> {
    if (!isGroup(entity) && !isDataset(entity)) {
      return {};
    }

    const { path } = entity;
    const file = await this.file_promise;
    const entity_obj = file.get(path);

    if (!isH5WasmDataset(entity_obj) && !isH5WasmGroup(entity_obj)) {
      throw new Error('Expected entity with attributes.');
    }

    return Object.fromEntries(
      Object.entries(entity_obj.attrs).map(([name, value]) => [
        name,
        (value as H5WasmAttribute).value,
      ])
    );
  }

  private processEntityObject(
    name: string,
    path: string,
    entity_obj: H5WasmEntity,
    recursive = false
  ): Entity {
    const baseEntity = {
      name,
      path,
    };

    if (entity_obj instanceof H5WasmGroup) {
      const baseGroup: Group = {
        ...baseEntity,
        kind: EntityKind.Group,
        attributes: this.processAttrsMetadata(entity_obj.attrs),
      };

      if (!recursive) {
        return baseGroup;
      }

      const children = entity_obj.keys().map((name) => {
        const item = entity_obj.get(name);
        return this.processEntityObject(
          name,
          buildEntityPath(path, name),
          item,
          false
        );
      });

      return {
        ...baseGroup,
        children,
      } as GroupWithChildren;
    } else if (entity_obj instanceof H5WasmDataset) {
      const { shape, dtype } = entity_obj;
      assertStr(dtype);

      return {
        ...baseEntity,
        kind: EntityKind.Dataset,
        attributes: this.processAttrsMetadata(entity_obj.attrs),
        shape,
        type: convertDtype(dtype),
      } as Dataset;
    } else if (entity_obj instanceof H5WasmBrokenSoftLink) {
      const { target } = entity_obj;
      return {
        ...baseEntity,
        attributes: [],
        kind: EntityKind.Unresolved,
        link: { class: 'Soft', path: target },
      };
    } else if (entity_obj instanceof H5WasmExternalLink) {
      const { filename, obj_path } = entity_obj;
      return {
        ...baseEntity,
        attributes: [],
        kind: EntityKind.Unresolved,
        link: { class: 'External', path: obj_path, file: filename },
      };
    }

    return {
      ...baseEntity,
      kind: EntityKind.Unresolved,
    } as UnresolvedEntity;
  }

  private processAttrsMetadata(attrs: object): Attribute[] {
    return Object.entries(attrs).map(([name, value]) => ({
      name,
      shape: value.shape,
      type: convertDtype((value as H5WasmAttribute).dtype),
    }));
  }
}
