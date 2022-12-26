import Episode from '../../models/episode';
import { IEpisodeLocalDatasource } from './types';

export default class EpisodeLocalDatasource implements IEpisodeLocalDatasource {
  constructor(private storage: Storage) {}
  
  getEpisode(episodeId: string) {
    throw new Error('not implemented');
  }

  saveEpisode(episode: Episode) {
    throw new Error('not implemented');
  }
}