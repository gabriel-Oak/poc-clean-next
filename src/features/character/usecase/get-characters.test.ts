import {instance, mock, when} from 'ts-mockito';
import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import GetCharatersUsecase from './get-characters';
import { PaginatedResult } from '../../../utils/types/request';
import CharacterExternalDatasource from '../datasources/external-datasource';

describe('GetCharactersUsecase tests', () => {
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });

  const datasourceMock = mock<CharacterExternalDatasource>();

  it('Should return instance of a Character', async () => {
    when(datasourceMock.getAll).thenReturn(async () => resultMock);
    const datasource = instance(datasourceMock);

    const usecase = new GetCharatersUsecase(datasource); 
    const result = await usecase.execute();
    expect(result).toEqual((resultMock));
  });
});