import { mock, mockReset } from 'jest-mock-extended';
import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-library/react';
import useFilterController from './controller';
import { HomeContextProps } from '../../HomeContext/types';
import theme from '../../../../utils/theme';
import { ThemeProvider } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { CharacterFilters } from '../../../../features/character/types/character-filter';

describe('useHomeController tests', () => {
  const homeControllerMock = mock<HomeContextProps>({
    state: {
      form: mock<UseFormReturn<CharacterFilters, unknown>>() as never
    }
  });
  const wrapper = ({ children }: never) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
  }

  beforeEach(() => {
    mockReset(homeControllerMock);
  });

  it('Should open the drawer', async () => {
    const { result } = await act(async () => await renderHook(
      () => useFilterController(homeControllerMock), { wrapper })
    );
    expect(result.current.state.open).toBeFalsy();

    await act(async () => await result.current.setOpen(true));
    expect(result.current.state.open).toBeTruthy();
  });

  it('Should clear filters', async () => {
    const { result } = await act(async () => await renderHook(
      () => useFilterController(homeControllerMock), { wrapper })
    );

    act(() => {
      result.current.clearFilters();
    });
    expect(homeControllerMock.search).toHaveBeenCalledWith({ page: 1 });
    expect(homeControllerMock.state.form.reset).toHaveBeenCalled();
  });

  it('Should submit filters', async () => {
    const { result } = await act(async () => await renderHook(
      () => useFilterController(homeControllerMock), { wrapper })
    );
    act(() => result.current.onSubmit({ name: 'Marijuana' }));
    expect(homeControllerMock.search).toHaveBeenCalledWith({
      filters: { name: 'Marijuana' },
      page: 1
    });
  });
});