import {instance, mock, when, capture} from 'ts-mockito';
import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import { PaginatedResult } from '../../../utils/types/request';
import CharacterExternalDatasource from '../datasources/external-datasource';
import { AxiosInstance } from 'axios';
import { CustomError } from '../../../utils/custom-error';

describe('CharacterExternalDatasource tests', () => {
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });

  const clientMock = mock<AxiosInstance>();

  it('Should return all Characters', async () => {
    when(clientMock.get).thenReturn(async () => ({ data: resultMock } as never));
    const client = instance(clientMock);

    const usecase = new CharacterExternalDatasource(client); 
    const result = await usecase.getAll();
    expect(result).toEqual(resultMock);
  });

  it('Should deal with error', async () => {
    when(clientMock.get).thenThrow(Error('Ding ding ding moderforker'));
    const client = instance(clientMock);

    const usecase = new CharacterExternalDatasource(client); 
    const result = await usecase.getAll();
    expect(result).toBeInstanceOf(CustomError);
  });
  
  it('Should return one Characters', async () => {
    when(clientMock.get).thenReturn(async () => ({ data: characterMock } as never));
    const client = instance(clientMock);

    const usecase = new CharacterExternalDatasource(client); 
    const result = await usecase.getCharacter('1');
    expect(result).toEqual(characterMock);
  });

  it('Should deal with error', async () => {
    when(clientMock.get).thenThrow(Error('Ding ding ding moderforker'));
    const client = instance(clientMock);

    const usecase = new CharacterExternalDatasource(client); 
    const result = await usecase.getCharacter('1');
    expect(result).toBeInstanceOf(CustomError);
  });
});