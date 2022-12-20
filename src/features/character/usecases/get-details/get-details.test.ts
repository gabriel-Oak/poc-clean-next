import Character from '../../models/character';
import character from '../../../../utils/mocks/characters.json';
import { CustomError } from '../../../../utils/custom-error';
import { mock, mockReset } from 'jest-mock-extended';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';
import createGetDetailsUsecase from '.';
import GetDetailsUsecase from './get-details';

describe('GetDetails tests', () => {
  const characterMock = new Character(character);
  const datasourceMock = mock<ICharacterExternalDatasource>();

  beforeEach(() => {
    mockReset(datasourceMock);
  });

  it('Should create GetDetails', () => {
    expect(createGetDetailsUsecase())
      .toBeInstanceOf(GetDetailsUsecase);
  });

  it('Should return instance of a Character', async () => {
    datasourceMock.getCharacter.mockImplementation(async () => characterMock);
    const usecase = new GetDetailsUsecase(datasourceMock);

    const result = await usecase.execute('1');
    expect(result).toEqual((characterMock));
  });

  it('Should validade id', async () => {
    const usecase = new GetDetailsUsecase(datasourceMock);
    const result = await usecase.execute('');

    expect(result).toBeInstanceOf(CustomError);
  });
});