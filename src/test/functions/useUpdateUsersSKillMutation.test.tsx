import { handlers } from '../../mocks/handlers';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import React, { PropsWithChildren, act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useAddNewSkillMutation,
  useUpdateUsersSKillMutation,
} from '../../services/serverApi';

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

const payload = {
  itemId: `KTkF4vAd6tsuBw84oZXt`,
  itemType: 'USER',
  tagId: '4qvOozqaWIiHT4fBlVjk',
  levelId: 'QEQfB3MhcZCB2nnGzj9T',
  tagType: 'SKILL',
  levelName: '2',
  tagName: 'EMBER',
  levelValue: 2,
};

describe('useUpdateUsersSKillMutation', () => {
  test('addes skill and also perform optimistic update', async () => {
    const { result } = renderHook(() => useUpdateUsersSKillMutation(), {
      wrapper: Wrapper,
    });

    const [updateUserSkill] = result.current;
    const { result: addNewSkillResult } = renderHook(() => useAddNewSkillMutation(), { wrapper: Wrapper });

    act(() => updateUserSkill(payload));

    const [addNewSkill, initialResponse] = addNewSkillResult.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void addNewSkill({
        itemId: 'KTkF4vAd6tsuBw84oZXt',
        itemType: 'USER',
        tagPayload: [
          {
            tagId: '4qvOozqaWIiHT4fBlVjk',
            levelId: '1dOI6j3YNW4XQR5rwQsm',
          },
        ],
      });
    });

    const loadingResponse = addNewSkillResult.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitFor(() => {
      expect(addNewSkillResult.current[1].data).not.toBeUndefined();
    });

    const loadedResponse = addNewSkillResult.current[1];
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });
});
