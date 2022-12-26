import { mock, mockReset } from 'jest-mock-extended';
import { IApiService } from '../../../../utils/services/api-service/types';
import location from '../../../../utils/mocks/episode.json';
import Location from '../../models/location';
import LocationExternalDatasource from './external-datasource';
import { CustomError } from '../../../../utils/custom-error';

describe('LocationExternalDatasource tests', () => {
  const clientMock = mock<IApiService>();
  const locationMock = new Location(location);
  const datasource = new LocationExternalDatasource(clientMock);

  beforeEach(() => {
    mockReset(clientMock);
  });
  
  it('Should return a location', async () => {
    clientMock.get.mockImplementation(async () =>  location);
    const result = await datasource.getDetails('63');

    expect(result).toBeInstanceOf(Location);
    expect(result).toEqual(locationMock);
  });

  it('Should deal with error', async () => {
    clientMock.get.mockRejectedValue(Error('Opa, deu ruim'));
    const result = await datasource.getDetails('63');

    expect(result).toBeInstanceOf(CustomError);
  });
});