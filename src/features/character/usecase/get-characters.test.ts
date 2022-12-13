import Character from "../models/character";
import character from '../mocks/characters.json';
import { GetCharatersUsecase } from "./get-characters";

describe('GetCharactersUsecase tests', () => {
  const characterMock = new Character(character);

  it('Should return instance of a Character', async () => {
    const usecase = new GetCharatersUsecase(); 
    const result = await usecase.execute();
    expect(result.results).toEqual((characterMock));
  });
});