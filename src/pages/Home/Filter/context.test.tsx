import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { render } from '@testing-library/react';
import FilterController from './controller';
import { FilterContextProps, FilterProvider, useFilter } from './context';
import { HomeProvider } from '../HomeContext/context';
import theme from '../../../utils/theme';
import { ThemeProvider } from '@mui/system';
import createContextTester, { getContextState } from '../../../utils/createContextTester';
import { useEffect } from 'react';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';

describe('FilterContext tests', () => {
  const controllerMock = mock<FilterController>();
  const getCharactersMock = mock<IGetCharatersUsecase>();

  beforeEach(() => {
    mockReset(controllerMock);
    mockReset(getCharactersMock);
  });

  it('Should filter empty', async () => {
    getCharactersMock.execute.mockImplementation(() => null as never);
    const Tester = createContextTester<FilterContextProps>(useFilter, ({ onSubmit }) => {
      useEffect(() => {
        onSubmit({});
      }, []);
    });

    const context = render(
      <ThemeProvider theme={theme}>
        <HomeProvider getCharactersFactory={() => getCharactersMock}>
          <FilterProvider
            controllerFactory={() => controllerMock}
          >
            <Tester />
          </FilterProvider>
        </HomeProvider>
      </ThemeProvider>
    );

    const { state } = getContextState<FilterContextProps>(context);

    expect(controllerMock.submit).toHaveBeenCalledWith({}, false, expect.anything());
    expect(state.open).toBeFalsy();
  });

  it('Should set drawer open', async () => {
    const Tester = createContextTester<FilterContextProps>(useFilter, ({ toggleDrawer }) => {
      useEffect(() => {
        toggleDrawer(true);
      }, []);
    });

    const context = render(
      <ThemeProvider theme={theme}>
        <HomeProvider getCharactersFactory={() => getCharactersMock}>
          <FilterProvider
            controllerFactory={() => controllerMock}
          >
            <Tester />
          </FilterProvider>
        </HomeProvider>
      </ThemeProvider>
    );;


    const { state } = getContextState<FilterContextProps>(context!);
    expect(state.open).toBeTruthy();
  });
});

