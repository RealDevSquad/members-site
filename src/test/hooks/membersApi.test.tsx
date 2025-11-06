import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import React, { PropsWithChildren, act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers';
import { userData } from '../../mocks/db/user';

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
    const { result } = renderHook(() => useGetAllUsersQuery(), {
      wrapper: Wrapper,
    });

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

describe('useUpdateUserRoleMutation', () => {
  test('it should update the user role', async () => {
    const { result } = renderHook(() => useUpdateUserRoleMutation(), {
      wrapper: Wrapper,
    });

    const [updateUserRole, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateUserRole({
        userId: userData.id,
        body: {
          roles: {
            member: true,
          },
        },
      });
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const nextResponse = result.current[1];
    expect(nextResponse).not.toBeUndefined();
    expect(nextResponse?.isSuccess).toBe(true);
    expect(nextResponse?.data?.message).toBe('User role updated successfully!');
  });
});
