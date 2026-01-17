import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Avatar,
} from '@chakra-ui/react';

import {
  useGetLevels,
  useGetSkillsQuery,
  filteredTagsData,
} from '../../../services/serverApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { useState } from 'react';

import MembersActiveSkills from './components/MembersActiveSkills/MembersActiveSkills';
import TagsMoadal from './components/TagsModal/TagsModal';

import { skills } from './types/memberSkills';

import styles from './memberSKillModal.module.css';

export default function MembersSkillUpdateModalPresentation({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const { username, picture, firstName, lastName } = useSelector(
    (state: RootState) => state.superUserOption,
  );

  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [searchTags, setSearchTags] = useState('');

  const tagsWithLevel = useGetLevels();
  const { data, isLoading: isSkillsLoading } = useGetSkillsQuery(username);

  const skills: skills[] = data?.skills;

  const filteredTags = filteredTagsData(tagsWithLevel, skills, searchTags);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className={styles.memberModal_content}>
        <ModalHeader className={styles.memberModal_header}>
          <Avatar
            className={styles.memberAvatar}
            name={firstName}
            src={picture}
          />
          <p data-testid="username" className={styles.memberProfile_name}>
            {`${firstName} ${lastName?.charAt(0)}.`}
          </p>
        </ModalHeader>
        <ModalCloseButton
          data-testid="close btn main"
          className={styles.memberModal_headerCloseButton}
        />
        <ModalBody className={styles.memberModal_body}>
          <p className={styles.memberModal_body_heading}>Skills</p>
          <MembersActiveSkills
            username={username}
            filteredTags={filteredTags}
            setIsTagsOpen={setIsTagsOpen}
            skills={skills}
            isSkillsLoading={isSkillsLoading}
          />
          {isTagsOpen && (
            <TagsMoadal
              username={username}
              searchTags={searchTags}
              setSearchTags={setSearchTags}
              setIsTagsOpen={setIsTagsOpen}
              filteredTags={filteredTags}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
