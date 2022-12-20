import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { render } from '@testing-library/react';
import FilterController from './controller';
import { FilterContextProps, FilterProvider, useFilter } from './context';
import { HomeProvider } from '../HomeContext/context';
import HomeController from '../controller';
import theme from '../../../utils/theme';
import { ThemeProvider } from '@mui/system';
import createContextTester, { getContextState } from '../../../utils/createContextTester';
import { useEffect } from 'react';

describe('FilterContext tests', () => {
  const controllerMock = mock<FilterController>();
  const controllerHomeMock = mock<HomeController>();

  beforeEach(() => {
    mockReset(controllerMock);
    mockReset(controllerHomeMock);
  });

  it('Should filter empty', async () => {
    controllerHomeMock.search.mockImplementation(() => null as never);
    const Tester = createContextTester<FilterContextProps>(useFilter, ({ onSubmit }) => {
      useEffect(() => {
        onSubmit({});
      }, []);
    });

    const context = render(
      <ThemeProvider theme={theme}>
        <HomeProvider controllerFactory={() => controllerHomeMock}>
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
        <HomeProvider controllerFactory={() => controllerHomeMock}>
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

