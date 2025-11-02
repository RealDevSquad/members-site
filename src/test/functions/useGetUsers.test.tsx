import { useGetUsers, useGetAllUsersQuery } from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

import React, { PropsWithChildren } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
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

describe('useGetUsers', () => {
  test('it should return all users', async () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: Wrapper,
    });

    const { result: membesResult } = renderHook(
      () => useGetAllUsersQuery(),
      {
        wrapper: Wrapper,
      },
    );

    const inititalResponse = result.current;
    expect(inititalResponse.data).toBeUndefined();
    expect(inititalResponse.isLoading).toBe(true);

    const membersInitialResponse = membesResult.current;
    expect(membersInitialResponse.data).toBeUndefined();
    expect(membersInitialResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(membesResult.current.data).not.toBeUndefined();
      expect(result.current.data).not.toBeUndefined();
    });

    const membersNextResponse = membesResult.current;
    expect(membersNextResponse.isLoading).toBe(false);

    const nextResponse = result.current;
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.error).toBeUndefined();
  });
});
