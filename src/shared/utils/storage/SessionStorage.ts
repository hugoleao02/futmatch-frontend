import { StorageBase } from './StorageBase';

export class SessionStorage extends StorageBase {
  protected storage = sessionStorage;
}

export const sessionStorage = new SessionStorage();
