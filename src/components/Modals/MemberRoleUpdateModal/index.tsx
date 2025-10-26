import { useDispatch, useSelector } from 'react-redux';
import MemberRoleUpdateModalPresentation from './Presentation';
import { RootState } from '@/src/store';
import { setIsUserRoleUpdateModalVisible } from '@/src/store/superUserOptions';
import { useUpdateUserRoleMutation } from '@/src/services/serverApi';
import { notifyError, notifySuccess } from '@/src/utils/toast';

export default function MemberRoleUpdateModal() {
  const { userId, isUserMember, isUserArchived } = useSelector(
    (state: RootState) => state.superUserOption,
  );
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
  const reduxDispatch = useDispatch();

  function closeUserRoleUpdateModal() {
    reduxDispatch(
      setIsUserRoleUpdateModalVisible({
        visibility: false,
        username: null,
        isUserMember: false,
        isUserArchived: false,
        userId: null,
      }),
    );
  }

  function promoteOrDemoteMember() {
    updateUserRole({ userId, body: { member: !isUserMember } })
      .unwrap()
      .then(() => {
        notifySuccess('User role updated successfully!');
        closeUserRoleUpdateModal();
      })
      .catch((err) => {
        const errorMessage = err?.data?.message || 'Something went wrong!';
        notifyError(errorMessage);
        closeUserRoleUpdateModal();
      });
  }

  function archiveOrUnarchiveMember() {
    updateUserRole({ userId, body: { archived: !isUserArchived } })
      .unwrap()
      .then(() => {
        notifySuccess('User role updated successfully!');
        closeUserRoleUpdateModal();
      })
      .catch((err) => {
        const errorMessage = err?.data?.message || 'Something went wrong!';
        notifyError(errorMessage);
        closeUserRoleUpdateModal();
      });
  }

  return (
    <MemberRoleUpdateModalPresentation
      onClose={closeUserRoleUpdateModal}
      promoteOrDemoteMember={promoteOrDemoteMember}
      archiveOrUnarchiveMember={archiveOrUnarchiveMember}
      isUserArchived={isUserArchived}
      isUserMember={isUserMember}
      isRoleUpdating={isLoading}
    />
  );
}
