import Episode from '../../models/episode';

export interface IEpisodeLocalDatasource {
  getEpisode: (episodeId: string) => Episode | null;
  saveEpisode: (episode: Episode) => void;
}