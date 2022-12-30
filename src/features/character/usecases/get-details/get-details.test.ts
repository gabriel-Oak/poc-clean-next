import Character from '../../models/character';
import character from '../../../../utils/mocks/characters.json';
import { CustomError } from '../../../../utils/custom-error';
import { mock, mockReset } from 'jest-mock-extended';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';
import createGetDetailsUsecase from '.';
import GetDetailsUsecase from './get-details';
import { ICharacterLocalDatasource } from '../../datasources/local-datasource/type';
import { Left, Right } from '../../../../utils/types/either';

describe('GetDetails tests', () => {
  const characterMock = new Character(character);
  const externalDatasourceMock = mock<ICharacterExternalDatasource>();
  const localDatasourceMock = mock<ICharacterLocalDatasource>();
  const usecase = new GetDetailsUsecase(externalDatasourceMock, localDatasourceMock);

  beforeEach(() => {
    mockReset(externalDatasourceMock);
    mockReset(localDatasourceMock);
  });

  it('Should create GetDetails', () => {
    expect(createGetDetailsUsecase())
      .toBeInstanceOf(GetDetailsUsecase);
  });

  it('Should return instance of a Character', async () => {
    externalDatasourceMock.getCharacter.mockImplementation(async () => new Right(characterMock));
    const result = await usecase.execute('1');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toEqual(characterMock);
    expect(localDatasourceMock.saveCharacter).not.toHaveBeenCalledWith(characterMock);
  });

  it('Should validade id', async () => {
    const result = await usecase.execute('');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(CustomError);
  });

  it('Shoudl get from local storage', async () => {
    localDatasourceMock.getCharacter.mockImplementation(() => characterMock);
    const result = await usecase.execute('23');

    expect(result).toBeInstanceOf((Right));
    expect((result as Right<unknown>).success).toEqual(characterMock);
    expect(externalDatasourceMock.getCharacter).not.toHaveBeenCalled();
  });
});