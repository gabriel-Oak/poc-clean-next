import { mock, mockReset } from 'jest-mock-extended';
import { createRef } from 'react';
import FilterController, { createFilterController } from './controller';
import { FilterInternalState } from './types';

describe('FilterController tests', () => {
  const state: FilterInternalState = { containerRef: createRef(), open: false };
  const setState = jest.fn();

  beforeEach(() => {
    setState.mockClear();
  });

  it('Factory should return a controller', () => {
    const controller = createFilterController();
    expect(controller).toBeInstanceOf(FilterController);
  });

  it('Should validade and submit search by name', () => {
    const submit = jest.fn();
    const controller = new FilterController();

    controller.submit({ name: 'juan' }, false, submit);
    expect(submit).toHaveBeenCalledWith({ page: 1, filters: { name: 'juan' } });
  });

  it('Should avoid calling when loading', () => {
    const submit = jest.fn();
    const controller = new FilterController();

    controller.submit({ name: 'juan' }, true, submit);
    expect(submit).not.toHaveBeenCalled();
  });
});