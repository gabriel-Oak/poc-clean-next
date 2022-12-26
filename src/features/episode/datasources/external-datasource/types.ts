import { CustomError } from '../../../../utils/custom-error';
import Episode from '../../models/episode';

export interface IEpisodeExternalDatasource {
  getEpisodes: (episodes: string[]) => Promise<Episode[] | CustomError>
}