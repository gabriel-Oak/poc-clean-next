import { CustomError } from '../../../../utils/custom-error';
import { IApiService } from '../../../../utils/services/api-service/types';
import Episode from '../../models/episode';
import { IEpisodeExternalDatasource } from './types';

export default class EpisodeExternalDatasource implements IEpisodeExternalDatasource {
  constructor(private client: IApiService) {}

  async getEpisodes(episodes: string[]) {
    try {
      const result = await this.client.get<Episode[] | Episode>(`episode/${episodes.join(',')}`);
      if (result instanceof Error) throw result;
      
      return Array.isArray(result) 
        ? result.map((r) => new Episode(r)) 
        : [new Episode(result as unknown as Episode)];
    } catch (error: any) {
      return new CustomError({
        message: error.message || 'Sorry, couldn\'t get the episode(s)',
      })
    }
  }
}