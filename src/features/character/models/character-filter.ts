export enum CharacterStatus {
  alive = 'alive',
  dead = 'dead',
  unknown = 'unknown',
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: string;
}