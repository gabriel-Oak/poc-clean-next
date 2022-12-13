import {instance, mock, when, capture} from 'ts-mockito';
import Character from "../models/character";
import character from '../mocks/characters.json';
import { GetCharatersUsecase } from "./get-characters";
import { ICharacterExternalDatasource } from '../datasources/external-datasource';
import { PaginatedResult } from '../../../utils/contracts/request';
import { CharacterStatus } from '../models/character-filter';

describe('GetCharactersUsecase tests', () => {
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });

  const datasourceMock = mock<ICharacterExternalDatasource>();

  it('Should return instance of a Character', async () => {
    when(datasourceMock.getAll).thenReturn(async () => resultMock);
    const datasource = instance(datasourceMock);

    const usecase = new GetCharatersUsecase(datasource); 
    const result = await usecase.execute();
    expect(result).toEqual((resultMock));
  });
});