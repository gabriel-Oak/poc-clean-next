import {instance, mock, when, capture} from 'ts-mockito';
import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import CharacterExternalDatasource from '../datasources/external-datasource';
import GetDetails from './get-details';
import { CustomError } from '../../../utils/custom-error';

describe('GetDetails tests', () => {
  const characterMock = new Character(character);
  const datasourceMock = mock<CharacterExternalDatasource>();

  it('Should return instance of a Character', async () => {
    when(datasourceMock.getCharacter).thenReturn(async () => characterMock);
    const datasource = instance(datasourceMock);

    const usecase = new GetDetails(datasource); 
    const result = await usecase.execute('1');
    expect(result).toEqual((characterMock));
  });

  it('Should validade id', async () => {
    const datasource = instance(datasourceMock);

    const usecase = new GetDetails(datasource); 
    const result = await usecase.execute('');
    expect(result).toBeInstanceOf(CustomError);
  });
});