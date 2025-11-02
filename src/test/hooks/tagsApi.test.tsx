import { useGetTagsQuery } from '../../services/serverApi';
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

describe('useGetTagsQuery', () => {
  test('returns tags', async () => {
    const { result } = renderHook(
      () => useGetTagsQuery(null),
      {
        wrapper: Wrapper,
      },
    );

    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const nextResponse = result.current;

    expect(nextResponse?.data?.message).toEqual('Tags returned successfully');
    expect(nextResponse?.data?.tags).toHaveLength(5);
  });
});
