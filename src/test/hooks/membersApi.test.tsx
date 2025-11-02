import {
  useGetAllUsersQuery,
  useUpdateMemberRoleMutation,
  useArchiveMemberMutation,
} from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

import React, { PropsWithChildren, act } from 'react';
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

describe('it shoud test all the users RTK query hooks', () => {
  test('it should return all users', async () => {
    const { result } = renderHook(
      () => useGetAllUsersQuery(),
      { wrapper: Wrapper },
    );

    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const nextResponse = result.current;
    expect(nextResponse?.data?.message).toBe('Users returned successfully!');
    expect(nextResponse?.data?.users).toHaveLength(4);
  });

  test('it should promote user to member', async () => {
    const { result } = renderHook(
      () => useUpdateMemberRoleMutation(),
      {
        wrapper: Wrapper,
      },
    );

    const [updateMemberRole, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateMemberRole({
        username: 'vinayak',
      });
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const loadedResponse = result.current[1];
    expect(loadedResponse.isLoading).toBe(false);
  });

  test('it should archive user', async () => {
    const { result } = renderHook(
      () => useArchiveMemberMutation(),
      {
        wrapper: Wrapper,
      },
    );

    const [archieveMemberMutation, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void archieveMemberMutation({
        username: 'vinayak',
      });
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const loadedResponse = result.current[1];
    expect(loadedResponse.isLoading).toBe(false);
  });
});
