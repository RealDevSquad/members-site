import { useGetContributionsQuery } from '../../services/serverApi';
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

describe('useGetContributionsQuery', () => {
  test('returns contributions', async () => {
    const { result } = renderHook(
      () => useGetContributionsQuery('vinayak'),
      { wrapper: Wrapper },
    );

    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const nextResponse = result.current;
    expect(nextResponse?.data?.noteworthy).toHaveLength(0);
    expect(nextResponse?.data?.all).toHaveLength(2);
  });
});
