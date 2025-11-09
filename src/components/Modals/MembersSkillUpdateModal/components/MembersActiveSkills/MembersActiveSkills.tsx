import { Wrap, WrapItem, Skeleton, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import Skills from './Skills';

import { skills, tagsWithLevelType } from '../../types/memberSkills';

import styles from './membersActiveSkills.module.css';

export default function MembersActiveSkills({
  filteredTags,
  setIsTagsOpen,
  skills,
  username,
  isSkillsLoading,
}: {
  filteredTags: tagsWithLevelType[];
  setIsTagsOpen: (value: any) => void;
  skills: skills[];
  username: string | null;
  isSkillsLoading: boolean;
}) {
  return (
    <Skeleton height="80%" isLoaded={!isSkillsLoading}>
      <Wrap
        data-testid="active skills"
        className={styles.memberActiveSkills_modal_wrap}
        spacing="1rem"
      >
        <Skills username={username} skills={skills} />
        {filteredTags?.length !== 0 && (
          <WrapItem>
            <IconButton
              data-testid="add icon"
              className={styles.memberActiveSkills_add_icon_button}
              onClick={() => setIsTagsOpen((prevstate: boolean) => !prevstate)}
              aria-label="Add skills"
              icon={<AddIcon className={styles.memberActiveSkills_add_icon} />}
            />
          </WrapItem>
        )}
      </Wrap>
    </Skeleton>
  );
}
