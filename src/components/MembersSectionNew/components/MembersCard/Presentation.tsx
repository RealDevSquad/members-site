import { Box, Text, Flex, Image } from '@chakra-ui/react';

import Socials from '../Socials';

import { UserType } from '../../types/MembersSection.type';

import styles from './membersCard.module.css';
import SettingButton from '../../../SettingButton/SettingButton';
import { SyntheticEvent } from 'react';

export default function MembersCardPresentation({
  member,
  openSkillUpdateModal,
  openRoleUpdateModal,
  shouldShowSetting,
  hideSetting,
  showSetting,
  routeHandler,
  isSuperUser,
}: {
  member: UserType;
  openSkillUpdateModal: (e: SyntheticEvent) => void;
  openRoleUpdateModal: (e: SyntheticEvent) => void;
  shouldShowSetting: boolean;
  hideSetting: () => void;
  showSetting: () => void;
  routeHandler: (e: SyntheticEvent) => void;
  isSuperUser: boolean;
}) {
  const imageToShow = member?.picture?.url || '/images/Avatar.png';

  const memberSocialURL = [
    member?.twitter_id,
    member?.github_id,
    member?.linkedin_id,
    member?.instagram_id,
  ];

  const [twitter_id, github_id, linkedin_id, instagram_id] =
    memberSocialURL.map((url) => {
      if (url !== undefined) {
        let memberSocialId: string | undefined = url;
        if (url.includes('https') || url.includes('http')) {
          const urlLastChar = url.charAt(url.length - 1);
          if (urlLastChar === '/') {
            const urlArray = url.split('/');
            memberSocialId = urlArray[urlArray.length - 2];
          } else {
            memberSocialId = url.split('/').pop();
          }
        } else {
          memberSocialId = url;
        }
        return memberSocialId;
      }
    });

  return (
    <Box
      as="button"
      onMouseEnter={showSetting}
      onMouseLeave={hideSetting}
      onClick={(e: SyntheticEvent) => routeHandler(e)}
      className={styles.member_card}
      data-testid="member card button"
    >
      <Image
        className={styles.member_card__image}
        src={imageToShow}
        alt="Picture of the author"
      />
      <Box className={styles.member_card__info}>
        <Text as="h1" className={styles.member_card__username}>
          {`${member.first_name} ${member.last_name}`}
        </Text>
        <small
          data-testid="designation"
          className={styles.member_card__designation}
        >
          {member.designation}
        </small>
      </Box>
      <Flex
        data-testid="socials links"
        justify="center"
        className={styles.member_card__socials}
        gap={1}
      >
        {member?.twitter_id && (
          <Socials
            url={`https://twitter.com/${twitter_id}`}
            icon="/icons/icons8-twitter.svg"
            alt="twitter icon"
          />
        )}
        {member.github_id && (
          <Socials
            url={`https://github.com/${github_id}`}
            icon="/icons/icons8-github.svg"
            alt="github icon"
          />
        )}
        {member.linkedin_id && (
          <Socials
            url={`https://linkedin.com/in/${linkedin_id}`}
            icon="/icons/icons8-linkedin.svg"
            alt="linkedin icon"
          />
        )}
        {member.instagram_id && (
          <Socials
            url={`https://instagram.com/${instagram_id}`}
            icon="/icons/icons8-instagram.svg"
            alt="instagram icon"
          />
        )}
      </Flex>
      {shouldShowSetting && isSuperUser && (
        <SettingButton
          openRoleUpdateModal={openRoleUpdateModal}
          openSkillUpdateModal={openSkillUpdateModal}
        />
      )}
    </Box>
  );
}
