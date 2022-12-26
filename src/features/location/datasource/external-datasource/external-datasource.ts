import { CustomError } from '../../../../utils/custom-error';
import { ILocationExternalDatasource } from './types';
import { IApiService } from '../../../../utils/services/api-service/types';
import Location from '../../models/location';

export default class LocationExternalDatasource implements ILocationExternalDatasource {
  constructor(private client: IApiService) { }

  async getDetails(locationId: string) {
    try {
      const result = await this.client.get<Location>(`/episode/${locationId}`);
      return new Location(result);
    } catch (error: any) {
      return new CustomError({ 
        message: error?.message || 'Sorry, couldn\'t get the location' 
      });
    }
  }
}