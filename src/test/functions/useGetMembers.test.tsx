import { useGetMembers, useGetAllUsersQuery } from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({
  children,
}: PropsWithChildren<Record<string, any>>): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

describe('useGetMembers', () => {
  test('it should returns members', async () => {
    const { result } = renderHook(() => useGetMembers(), { wrapper: Wrapper });

    const { result: membersResult, waitForNextUpdate } = renderHook(
      () => useGetAllUsersQuery(),
      { wrapper: Wrapper },
    );

    const inititalResponse = result.current;
    expect(inititalResponse.data).toBeUndefined();
    expect(inititalResponse.isLoading).toBe(true);

    const membersInitialResponse = membersResult.current;
    expect(membersInitialResponse.data).toBeUndefined();
    expect(membersInitialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());

    const membersNextResponse = membersResult.current;
    expect(membersNextResponse.data).not.toBeUndefined();
    expect(membersNextResponse.isLoading).toBe(false);

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.error).toBeUndefined();
  });
});
