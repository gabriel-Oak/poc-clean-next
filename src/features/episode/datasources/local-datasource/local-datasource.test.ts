import { mock, mockReset } from 'jest-mock-extended';
import Episode from '../../models/episode';
import episode from '../../../../utils/mocks/episode.json';
import EpisodeLocalDatasource from './local-datasource';

describe.skip('EpisodeLocalDatasource tests', () => {
  const storageMock = mock<Storage>();
  const datasource = new EpisodeLocalDatasource(storageMock);
  const episodeMock = new Episode(episode);

  beforeEach(() => {
    mockReset(storageMock);
  });

  it('Should return a episode', () => {
    storageMock.getItem.mockImplementation(() => JSON.stringify(episode));
    const result = datasource.getEpisode('1');

    expect(result).toBeInstanceOf(Episode);
    expect(result).toEqual(episodeMock);
  });

  it('Should return null', () => {
    storageMock.getItem.mockImplementation(() => null);
    const result = datasource.getEpisode('2');

    expect(result).toBeNull();
  });

  it('Should save an episode', () => {
    datasource.saveEpisode(episodeMock);
    expect(storageMock.setItem)
      .toHaveBeenCalledWith('episode/1', JSON.stringify(episode));
  });
});