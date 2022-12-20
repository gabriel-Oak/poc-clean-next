import Character from '../../models/character';
import character from '../../../../utils/mocks/characters.json';
import GetCharactersUsecase from './get-characters';
import { PaginatedResult } from '../../../../utils/types/request';
import { mock, mockReset } from 'jest-mock-extended';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';
import createGetCharactersUsecase from '.';

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

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should create GetCharactersUsecase', () => {
    expect(createGetCharactersUsecase())
      .toBeInstanceOf(GetCharactersUsecase);
  });

  it('Should return instance of a Character', async () => {
    datasourceMock.getAll.mockImplementation(async () => resultMock);
    const usecase = new GetCharactersUsecase(datasourceMock); 

    const result = await usecase.execute();
    expect(result).toEqual((resultMock));
  });
});