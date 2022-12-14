// import {instance, mock, when, capture} from 'ts-mockito';
import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import { PaginatedResult } from '../../../utils/types/request';
import CharacterExternalDatasource from '../datasources/external-datasource';
import { AxiosInstance } from 'axios';
import { CustomError } from '../../../utils/custom-error';
import { mock, mockReset } from "jest-mock-extended";
import ApiService from "../../../utils/services/api-service";

describe('CharacterExternalDatasource tests', () => {
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });
  const clientMock = mock<ApiService>();

  beforeEach(() => {
    mockReset(clientMock);
  });

  it('Should return all Characters', async () => {
    clientMock.get.mockImplementation(async () => resultMock);
    const usecase = new CharacterExternalDatasource(clientMock); 

    const result = await usecase.getAll();
    expect(result).toEqual(resultMock);
  });

  it('Should deal with error', async () => {
    clientMock.get.mockRejectedValue(Error('Ding ding ding moderforker'));
    const usecase = new CharacterExternalDatasource(clientMock); 

    const result = await usecase.getAll();
    expect(result).toBeInstanceOf(CustomError);
  });
  
  it('Should return one Characters', async () => {
    clientMock.get.mockImplementation(async () => characterMock);
    const usecase = new CharacterExternalDatasource(clientMock); 

    const result = await usecase.getCharacter('1');
    expect(result).toEqual(characterMock);
  });

  it('Should deal with error', async () => {
    clientMock.get.mockRejectedValue(Error('Ding ding ding moderforker'));
    const usecase = new CharacterExternalDatasource(clientMock); 

    const result = await usecase.getCharacter('1');
    expect(result).toBeInstanceOf(CustomError);
  });
});