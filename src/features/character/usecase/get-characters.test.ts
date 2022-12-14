import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import GetCharatersUsecase from './get-characters';
import { PaginatedResult } from '../../../utils/types/request';
import CharacterExternalDatasource from '../datasources/external-datasource';
import { mock, mockReset } from "jest-mock-extended";

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

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should return instance of a Character', async () => {
    datasourceMock.getAll.mockImplementation(async () => resultMock);
    const usecase = new GetCharatersUsecase(datasourceMock); 

    const result = await usecase.execute();
    expect(result).toEqual((resultMock));
  });
});