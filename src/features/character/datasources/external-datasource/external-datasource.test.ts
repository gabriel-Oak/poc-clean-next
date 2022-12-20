import Character from '../../models/character';
import character from '../../../../utils/mocks/characters.json';
import { PaginatedResult } from '../../../../utils/types/request';
import { CustomError } from '../../../../utils/custom-error';
import { mock, mockReset } from 'jest-mock-extended';
import CharacterExternalDatasource from './external-datasource';
import { IApiService } from '../../../../utils/services/api-service/types';
import createCharacterExternalDatasource from '.';

describe('CharacterExternalDatasource tests', () => {
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });
  const clientMock = mock<IApiService>();

  beforeEach(() => {
    mockReset(clientMock);
  });

  it('Should create CharacterExternalDatasource', () => {
    expect(createCharacterExternalDatasource())
      .toBeInstanceOf(CharacterExternalDatasource);
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