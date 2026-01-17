import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserType } from '../components/MembersSectionNew/types/MembersSection.type';
import {
  levels,
  skills,
  tags,
  tagsWithLevelType,
  updateSkills,
} from '../components/Modals/MembersSkillUpdateModal/types/memberSkills';
import { UsersResponseType } from '../types/user';
import { notifyError, notifySuccess } from '../utils/toast';
const BASE_URL = 'https://api.realdevsquad.com';

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    'Skill',
    'Contributions',
    'ActiveTasks',
    'AllUsers',
    'User',
    'AllMembers',
  ],
  endpoints: (builder) => ({
    // Queries
    getAllUsers: builder.query<UsersResponseType, void>({
      query: () => BASE_URL + '/users?size=100',
      providesTags: ['AllUsers'],
    }),
    getAllMembers: builder.query<UsersResponseType, void>({
      query: () => BASE_URL + '/users?roles=member',
      providesTags: ['AllMembers'],
    }),
    getUser: builder.query<UserType, string>({
      query: (userName) => `${BASE_URL}/users/${userName}`,
      providesTags: ['User'],
    }),
    getSelfDetails: builder.query<UserType, void>({
      query: () => `${BASE_URL}/users?profile=true`,
    }),
    getContributions: builder.query<Object, string>({
      query: (userName) => `${BASE_URL}/contributions/${userName}`,
      providesTags: ['Contributions'],
    }),
    getUserActiveTask: builder.query<Object, string>({
      query: (userName) => `${BASE_URL}/tasks/${userName}?status=IN_PROGRESS`,
      providesTags: ['ActiveTasks'],
    }),
    getUsersWithLoadMore: builder.query<UsersResponseType, string | void>({
      query: (nextUrl) => (nextUrl ? nextUrl : `${BASE_URL}/users?size=100`),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.users.push(...newItems.users);
        currentCache.links = newItems.links;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['AllUsers'],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/temporary/data`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['AllUsers', 'User'],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ isNoteworthy, taskId }) => ({
        url: `/tasks/${taskId}`,
        method: 'PATCH',
        body: {
          isNoteworthy,
        },
      }),
      invalidatesTags: ['ActiveTasks', 'Contributions'],
    }),
  }),
});

export const {
  useGetContributionsQuery,
  useGetAllUsersQuery,
  useGetUserActiveTaskQuery,
  useGetUserQuery,
  useGetSelfDetailsQuery,
  useUpdateTaskStatusMutation,
  useUpdateUserRoleMutation,
  useGetAllMembersQuery,
} = serverApi;

export const useGetMembers = () => {
  const { data, isLoading, isFetching, error } =
    serverApi.useGetAllMembersQuery();

  const usersWithMemberRole = data?.users?.filter(
    (member: UserType) => member?.first_name && !member.roles.archived,
  );
  // To show the members in an Alphabetical Order w.r.t their first name.
  const sortedMembers = usersWithMemberRole?.sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1,
  );
  return {
    data: sortedMembers,
    isLoading,
    isFetching,
    error,
  };
};

export const useGetUsers = () => {
  const { data, isLoading, isFetching, error } =
    serverApi.useGetAllUsersQuery();
  const usersWithoutMemberRole = data?.users?.filter(
    (user: UserType) =>
      !user?.roles.member &&
      user?.first_name &&
      !user.roles.archived &&
      user.roles.in_discord,
  );
  // To show the Non-members in an Alphabetical Order w.r.t their first name
  const sortedNonMembers = usersWithoutMemberRole?.sort((a, b) =>
    a.first_name > b.first_name ? 1 : -1,
  );

  return {
    data: sortedNonMembers,
    isLoading,
    isFetching,
    error,
  };
};

export const useGetUserWithLoadMore = () => {
  const [nextUrl, setNextUrl] = useState<string | void>(undefined);
  const { data, isLoading, isFetching, error } =
    serverApi.useGetUsersWithLoadMoreQuery(nextUrl);

  const usersWithoutMemberRole = data?.users?.filter(
    (user: UserType) =>
      !user?.roles.member &&
      user?.first_name &&
      !user.roles.archived &&
      user.roles.in_discord,
  );

  const sortedNonMembers = usersWithoutMemberRole?.sort((a, b) =>
    a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1,
  );

  const nextUrlLink = data?.links?.next;

  const loadMore = () => {
    if (nextUrlLink && !!nextUrlLink.length) {
      setNextUrl(data.links.next);
    }
  };

  return {
    data: sortedNonMembers,
    isLoading,
    isFetching,
    error,
    loadMore,
    links: data?.links,
  };
};

//this is used for getting tags for membersSkillUpdateModal
export const tagsApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    //Queries
    getTags: builder.query({
      query: () => BASE_URL + '/tags',
    }),
    getLevels: builder.query({
      query: () => BASE_URL + '/levels',
    }),
    getSkills: builder.query({
      query: (username) => `${BASE_URL}/users/${username}/skills`,
      providesTags: ['Skill'],
    }),
    //Mutations
    addNewSkill: builder.mutation({
      query: (payload) => ({
        url: '/items',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Skill'],
    }),
    removeSkills: builder.mutation({
      query: (payload) => ({
        url: '/items',
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Skill'],
      // async onQueryStarted({ tagId, itemId}, {dispatch, queryFulfilled}) {
      //   const removeResult = dispatch(
      //     tagsApi.util.updateQueryData('getSkills', itemId, (draft) => {
      //       return draft?.skills?.filter((skill) => skill.id !== tagId);
      //     })
      //   )
      // },
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetLevelsQuery,
  useGetSkillsQuery,
  useAddNewSkillMutation,
  useRemoveSkillsMutation,
} = tagsApi;

export const useGetLevels = () => {
  const { data: tagsData, isLoading: isTagsLoading } =
    tagsApi.useGetTagsQuery(null);
  const { data: levelsData, isLoading: isLevelsLoading } =
    tagsApi.useGetLevelsQuery(null);
  const tags: tags[] = tagsData?.tags;
  const levels: levels[] = levelsData?.levels;

  let tagsWithLevel: tagsWithLevelType[] = [];

  for (let i = 0; i < tags?.length; i++) {
    for (let j = 0; j < levels?.length; j++) {
      tagsWithLevel = [
        ...tagsWithLevel,
        {
          name: `${tags[i].name} level ${levels[j].name}`,
          tagId: tags[i].id,
          levelId: levels[j].id,
          tagType: `${tags[i].type}`,
          tagName: `${tags[i].name}`,
          levelName: `${levels[j].name}`,
          levelValue: levels[j].value,
        },
      ];
    }
  }

  return tagsWithLevel;
};

export const filteredTagsData = (
  tags: tagsWithLevelType[],
  skills: skills[],
  searchSkill: string,
) => {
  if (searchSkill !== '') {
    return tags?.filter((tag) =>
      tag.name.toLowerCase().includes(searchSkill.toLowerCase()),
    );
  }
  if (skills?.length >= 0) {
    return tags?.filter(
      (tag) =>
        !skills?.some(
          (skill) => skill.tagId === tag.tagId && skill.levelId === tag.levelId,
        ),
    );
  }
  return tags;
};

export const useUpdateUsersSKillMutation = () => {
  const reduxDispatch = useDispatch<any>();
  const [addNewSkill] = useAddNewSkillMutation();

  function updateUserSkill(payload: updateSkills) {
    reduxDispatch(
      tagsApi.util.updateQueryData('getSkills', payload.itemId, (draft) => {
        draft?.skills?.push(payload);
      }),
    );

    addNewSkill({
      itemId: payload.itemId,
      itemType: 'USER',
      tagPayload: [
        {
          tagId: payload.tagId,
          levelId: payload.levelId,
        },
      ],
    })
      .unwrap()
      .then(() => {
        notifySuccess('Skill added successfully');
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || 'Something went wrong!';
        notifyError(errorMessage);
      });
  }

  return [updateUserSkill];
};

export default serverApi;
