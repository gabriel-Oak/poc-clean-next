import { CustomError } from '../../../../utils/custom-error';
import Location from '../../models/location';

export interface ILocationExternalDatasource {
  getDetails: (locationId: string) => Promise<CustomError | Location>;
}