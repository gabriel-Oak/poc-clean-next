import { mock, mockReset } from 'jest-mock-extended';
import character from '../../../../utils/mocks/characters.json';
import Character from '../../models/character';
import CharacterLocalDatasource from './local-datasource';

describe('CharacterLocalDatasource tests', () => {
  const storageMock = mock<Storage>();
  const datasource = new CharacterLocalDatasource(storageMock);

  beforeEach(() => {
    mockReset(storageMock);
  });

  it('Should get charater from local storage', () => {
    storageMock.getItem.mockImplementation(() => JSON.stringify(character));
    const result = datasource.getCharacter('34789');

    expect(result).toBeInstanceOf(Character);
  });

  it('Should return null', () => {
    storageMock.getItem.mockImplementation(() => null);
    const result = datasource.getCharacter('34789');

    expect(result).toBeNull();
  });

  it('Should save character', () => {
    storageMock.setItem.mockImplementation(() => null);
    const result = datasource.saveCharacter(new Character(character));

    expect(storageMock.setItem)
      .toHaveBeenCalledWith(`character/1`, JSON.stringify(character));
  });
});