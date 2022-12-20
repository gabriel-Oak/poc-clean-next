import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import HomeController from './controller';
import { fireEvent, render } from '@testing-library/react';
import { HomeContextProps, HomeProvider, useHome } from './HomeContext/context';
import createContextTester from '../../utils/createContextTester';

describe('HomeContext tests', () => {
  const controllerMock = mock<HomeController>();

  beforeEach(() => {
    mockReset(controllerMock);
  });

  it('Should search for characts at startup', async () => {
    render(
      <HomeProvider
        controllerFactory={() => controllerMock}
      >
        <div />
      </HomeProvider>
    );

    expect(controllerMock.search).toHaveBeenCalled();
  });

  it('Should search for characts by name and page 2', async () => {
    const Tester = createContextTester<HomeContextProps>(useHome, ({ searchCharacters }) => {
      searchCharacters(2, { name: 'thigas' });
    });

    render(
      <HomeProvider controllerFactory={() => controllerMock}>
        <Tester />
      </HomeProvider>
    );

    expect(controllerMock.search).toHaveBeenCalledWith(expect.objectContaining({
      filters: { name: 'thigas' },
      page: 2,
    }));
  });
});