import mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { render } from '@testing-library/react';
import { FilterProvider, useFilter } from '.';
import { HomeProvider } from '../../HomeContext';
import theme from '../../../../utils/theme';
import { ThemeProvider } from '@mui/system';
import createContextTester, { getContextState } from '../../../../utils/createContextTester';
import { useEffect } from 'react';
import { IGetCharatersUsecase } from '../../../../features/character/usecases/get-characters/types';
import { FilterContextProps } from './types';

describe('FilterContext tests', () => {
  const getCharactersMock = mock<IGetCharatersUsecase>();

  beforeEach(() => {
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
          <FilterProvider >
            <Tester />
          </FilterProvider>
        </HomeProvider>
      </ThemeProvider>
    );

    const { state } = getContextState<FilterContextProps>(context);

    expect(state.open).toBeFalsy();
    expect(getCharactersMock.execute).toHaveBeenLastCalledWith({
      page: 1,
      filters: {},
    })
  });

  it('Should set drawer open', async () => {
    const Tester = createContextTester<FilterContextProps>(useFilter, ({ setOpen }) => {
      useEffect(() => {
        setOpen(true);
      }, []);
    });

    const context = render(
      <ThemeProvider theme={theme}>
        <HomeProvider getCharactersFactory={() => getCharactersMock}>
          <FilterProvider >
            <Tester />
          </FilterProvider>
        </HomeProvider>
      </ThemeProvider>
    );;


    const { state } = getContextState<FilterContextProps>(context!);
    expect(state.open).toBeTruthy();
  });
});

