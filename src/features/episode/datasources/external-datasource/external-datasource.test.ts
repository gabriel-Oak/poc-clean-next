import { mock, mockReset } from 'jest-mock-extended';
import { IApiService } from '../../../../utils/services/api-service/types';
import episode from '../../../../utils/mocks/episode.json';
import Episode from '../../models/episode';
import EpisodeExternalDatasource from './external-datasource';
import { CustomError } from '../../../../utils/custom-error';

describe('EpisodeExternalDatasource tests', () => {
  const clientMock = mock<IApiService>();
  const episodeMock = new Episode(episode);
  const datasource = new EpisodeExternalDatasource(clientMock);

  beforeEach(() => {
    mockReset(clientMock);
  });
  
    it('Should deal with error', async () => {
      clientMock.get.mockResolvedValue(Error('Ops'));
      const result = await datasource.getEpisodes(['1']);
  
      expect(result).toBeInstanceOf(CustomError);
    });

  it('Should return episodes', async () => {
    clientMock.get.mockImplementation(async () => [episode, episode, episode]);
    const result = await datasource.getEpisodes(['32', '54', '34']);

    expect(result).toBeInstanceOf(Array);
    expect((result as Episode[])[0]).toEqual(episodeMock);
  });

  it('Should return a single episode', async () => {
    clientMock.get.mockImplementation(async () => episode);
    const result = await datasource.getEpisodes(['1']);

    expect((result as Episode[])[0]).toBeInstanceOf(Episode);
  });
});