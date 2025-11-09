import { Box, Input, IconButton } from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';

import { tagsWithLevelType } from '@/src/components/Modals/MembersSkillUpdateModal/types/memberSkills';
import { useRef } from 'react';

import Tags from './Tags';

import styles from './tagsModal.module.css';

export default function TagsMoadal({
  setIsTagsOpen,
  searchTags,
  setSearchTags,
  filteredTags,
  username,
}: {
  setIsTagsOpen: (value: boolean) => void;
  searchTags: string;
  setSearchTags: (value: string) => void;
  filteredTags: tagsWithLevelType[];
  username: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  let button;

  if (searchTags === '') {
    button = (
      <IconButton
        data-testid="search btn"
        className={styles.skills_search_icon_button}
        sx={{
          minWidth: '0',
        }}
        aria-label="Search skills"
        icon={<SearchIcon />}
      />
    );
  } else {
    button = (
      <IconButton
        data-testid="close btn"
        className={styles.skills_search_icon_button}
        onClick={() => {
          setSearchTags('');
          if (inputRef.current !== null) inputRef.current.value = '';
        }}
        sx={{
          minWidth: '0',
        }}
        aria-label="Search skills"
        icon={<CloseIcon className={styles.skills_search_close_icon} />}
      />
    );
  }

  return (
    <Box
      data-testid="tagModal bg_gray"
      onClick={() => setIsTagsOpen(false)}
      className={styles.bg_gray}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        className={styles.skills_container}
      >
        <Box className={styles.skills_search_box}>
          <Input
            className={styles.skills_input_search}
            _focusVisible={{
              outline: 'none',
            }}
            ref={inputRef}
            onChange={(e) => setSearchTags(e.target.value)}
            placeholder="Skill"
            size="xs"
          />
          {button}
        </Box>
        <Tags
          filteredTags={filteredTags}
          username={username}
          setSearchTags={setSearchTags}
          setIsTagsOpen={setIsTagsOpen}
          inputRef={inputRef}
        />
      </Box>
    </Box>
  );
}
