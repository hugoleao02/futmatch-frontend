import { StorageBase } from './StorageBase';

export class LocalStorage extends StorageBase {
  protected storage: Storage = window.localStorage;
}

export const localStorage = new LocalStorage();
