import Character from "../models/character";
import character from '../../../utils/mocks/characters.json';
import CharacterExternalDatasource from '../datasources/external-datasource';
import GetDetails from './get-details';
import { CustomError } from '../../../utils/custom-error';
import { mock, mockReset } from "jest-mock-extended";

describe('GetDetails tests', () => {
  const characterMock = new Character(character);
  const datasourceMock = mock<CharacterExternalDatasource>();

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should return instance of a Character', async () => {
    datasourceMock.getCharacter.mockImplementation(async () => characterMock);
    const usecase = new GetDetails(datasourceMock); 

    const result = await usecase.execute('1');
    expect(result).toEqual((characterMock));
  });

  it('Should validade id', async () => {
    const usecase = new GetDetails(datasourceMock); 
    const result = await usecase.execute('');
    
    expect(result).toBeInstanceOf(CustomError);
  });
});