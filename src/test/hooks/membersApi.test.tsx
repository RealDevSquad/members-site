import { useGetAllUsersQuery } from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
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

describe('it shoud test all the users RTK query hooks', () => {
  test('it should return all users', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetAllUsersQuery(),
      { wrapper: Wrapper },
    );

    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());

    const nextResponse = result.current;
    expect(nextResponse?.data).not.toBeUndefined();
    expect(nextResponse?.data?.message).toBe('Users returned successfully!');
    expect(nextResponse?.data?.users).toHaveLength(4);
  });
});
