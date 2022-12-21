import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { render } from '@testing-library/react';
import { HomeProvider, useHome } from '.';
import createContextTester from '../../../utils/createContextTester';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import { HomeContextProps } from './types';

describe('HomeContext tests', () => {
  const getCharactersMock = mock<IGetCharatersUsecase>();

  beforeEach(() => {
    mockReset(getCharactersMock);
  });

  it('Should search for characts at startup', async () => {
    render(
      <HomeProvider
        getCharactersFactory={() => getCharactersMock}
      >
        <div />
      </HomeProvider>
    );

    expect(getCharactersMock.execute).toHaveBeenCalled();
  });

  it('Should search for characts by name and page 2', async () => {
    const Tester = createContextTester<HomeContextProps>(useHome, ({ search }) => {
      search({page: 2, filters: { name: 'thigas' }});
    });

    render(
      <HomeProvider getCharactersFactory={() => getCharactersMock}>
        <Tester />
      </HomeProvider>
    );

    expect(getCharactersMock.execute).toHaveBeenCalledWith(expect.objectContaining({
      filters: { name: 'thigas' },
      page: 2,
    }));
  });
});