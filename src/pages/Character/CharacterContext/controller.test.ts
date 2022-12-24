import { act, renderHook } from '@testing-library/react';
import { mock, mockReset } from 'jest-mock-extended';
import Character from '../../../features/character/models/character';
import { IGetDetailsUsecase } from '../../../features/character/usecases/get-details/types';
import useCharacterController from './controller';
import character from '../../../utils/mocks/characters.json';
import { NextRouter } from 'next/router'
import { CustomError } from '../../../utils/custom-error';

const routerMock = mock<NextRouter>({
  query: { characterId: 'ihudfihuxcvuhuifsd' }
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => routerMock)
}));

describe('CharacterController Tests', () => {

  const usecaseMock = mock<IGetDetailsUsecase>();
  const characterMock = new Character(character);
  const errorMock = new CustomError({ message: 'Oops, got in short pants dawg' })

  beforeEach(() => {
    mockReset(usecaseMock);
  });

  it('Should search for character at startup', async () => {
    usecaseMock.execute.mockImplementation(async () => characterMock);
    const { result } = await act(async () => await renderHook(() => useCharacterController(usecaseMock)));

    expect(result.current.state.character).toEqual(characterMock);
    expect(result.current.state.isLoading).toBeFalsy();
  });

  it('Should set the error in state', async () => {
    usecaseMock.execute.mockImplementation(async () => errorMock);
    const { result } = await act(async () => await renderHook(() => useCharacterController(usecaseMock)));

    expect(result.current.state.errorState).toEqual(errorMock);
    expect(result.current.state.isLoading).toBeFalsy();
  });

  it('Should refresh when error in state and get a character', async () => {
    usecaseMock.execute.mockImplementationOnce(async () => errorMock);
    const { result } = await act(async () => await renderHook(() => useCharacterController(usecaseMock)));
    expect(result.current.state.errorState).toEqual(errorMock);

    usecaseMock.execute.mockImplementationOnce(async () => characterMock);
    await act(async()=> await result.current.search('734'));

    expect(result.current.state.character).toEqual(characterMock);
    expect(result.current.state.errorState).toBeNull();
  });
});