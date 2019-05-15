import { getRouterParams } from './selectors';

describe('router selectors', () => {
  it('can select params', () => {
    const routerState = { params: { id: 2 } };

    expect(getRouterParams.projector(routerState)).toBe(routerState.params);
    expect(getRouterParams.projector(null)).toBeNull();
  });
});
