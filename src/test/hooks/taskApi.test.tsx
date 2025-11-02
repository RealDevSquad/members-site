import { useUpdateTaskStatusMutation } from '../../services/serverApi';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

import React, { PropsWithChildren, act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers';

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({
  children,
}: PropsWithChildren<Record<string, any>>): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

describe('useUpdateTaskStatusMutation', () => {
  test('it should update the task status', async () => {
    const { result } = renderHook(
      () => useUpdateTaskStatusMutation(),
      {
        wrapper: Wrapper,
      },
    );

    const [updateTaskStatus, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void updateTaskStatus({
        isNoteworthy: false,
        taskId: '007ql3W886LKPqXSf1Jn',
      });
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const nextResponse = result.current[1];
    expect(nextResponse).not.toBeUndefined();
  });
});
