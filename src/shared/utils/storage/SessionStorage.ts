import { StorageBase } from './StorageBase';

export class SessionStorage extends StorageBase {
  protected storage: Storage = window.sessionStorage;
}

export const sessionStorage = new SessionStorage();
