import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import HomeController from './controller';
import { render, act } from '@testing-library/react';
import { HomeProvider } from './context';

describe('HomeContext tests', () => {
  const controllerMock = mock<HomeController>();

  beforeEach(() => {
    mockReset(controllerMock);
  });

  it('Should search for characts at startup', async () => {
    const component = render(
      <HomeProvider
        controllerFactory={() => controllerMock}
      >
        <div />
      </HomeProvider>
    );

    expect(controllerMock.getAll).toHaveBeenCalled();
  });
});