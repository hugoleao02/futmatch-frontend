import type { PartidaRequest } from './PartidaRequest.ts';

export interface PartidaUpdateRequest extends PartidaRequest {
  id: string;
}
