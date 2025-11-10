import { createSlice } from '@reduxjs/toolkit';

interface superUserOptionsState {
  isUserRoleUpdateModalVisible: boolean;
  username: string | null;
  picture: string | null;
  firstName: string | null;
  lastName: string | null;
  isTaskUpdateModalVisible: boolean;
  taskId: string | null;
  isUserSkillUpdateModalVisible: boolean;
  isUserMember: boolean;
  isTaskNoteworthy: boolean;
  userId: string | null;
  isUserArchived: boolean;
}

const initialState: superUserOptionsState = {
  isUserRoleUpdateModalVisible: false,
  username: null,
  picture: null,
  firstName: null,
  lastName: null,
  isTaskUpdateModalVisible: false,
  taskId: null,
  userId: null,
  isUserSkillUpdateModalVisible: false,
  isUserMember: false,
  isUserArchived: false,
  isTaskNoteworthy: false,
};

export const superUserOptions = createSlice({
  name: 'superUserOptions',
  initialState: initialState,
  reducers: {
    setIsUserRoleUpdateModalVisible: (
      state,
      { payload: { visibility, username, isUserMember, userArchived, userId } },
    ) => {
      state.isUserRoleUpdateModalVisible = visibility;
      state.username = username;
      state.isUserArchived = userArchived;
      state.userId = userId;
      state.isUserMember = isUserMember;
    },
    setIsTaskUpdateModalVisible: (
      state,
      { payload: { visibility, taskId, isTaskNoteworthy } },
    ) => {
      ((state.isTaskUpdateModalVisible = visibility), (state.taskId = taskId));
      state.isTaskNoteworthy = isTaskNoteworthy;
    },
    setUserSkillModalVisibility: (
      state,
      { payload: { visibility, username, picture, firstName, lastName } },
    ) => {
      state.isUserSkillUpdateModalVisible = visibility;
      state.username = username;
      state.picture = picture;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

export const {
  setIsUserRoleUpdateModalVisible,
  setIsTaskUpdateModalVisible,
  setUserSkillModalVisibility,
} = superUserOptions.actions;

export default superUserOptions.reducer;
