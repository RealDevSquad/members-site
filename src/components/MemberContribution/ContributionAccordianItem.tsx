import { RootState } from '@/src/store';
import { Box, Text, Button, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DeliveryDetails from './DeliveryDetails';
import NextLink from 'next/link';
import styles from './memberContribution.module.css';
import Image from 'next/image';
import { useGetIsSuperUser } from '../../utils/customHooks';
import { LINKS } from '@/src/constants/AppConstants';

const URL = LINKS.STATUS_BASE_URL;
interface TaskDetails {
  title: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  raisedBy: string;
  featureUrl: string;
  purpose: string;
  id: string;
  isNoteworthy: string;
}

type ContributionAccordionItemProps = Readonly<{
  task: TaskDetails;
  isTitle: boolean;
  openTaskStatusUpdateModal: (taskId: string, isTaskNoteworthy: string) => void;
}>;

export default function ContributionAccordianItem({
  task,
  isTitle,
  openTaskStatusUpdateModal,
}: ContributionAccordionItemProps) {
  const { featureUrl, url, title: taskTitle, purpose, id, isNoteworthy } = task;
  const { isOptionKeyPressed } = useSelector(
    (state: RootState) => state.keyboard,
  );
  const isSuperUser = useGetIsSuperUser();
  const [shouldShowSetting, setShouldShowSetting] = useState<boolean>(false);

  const prUrl = url || featureUrl;

  function showSetting() {
    if (isOptionKeyPressed) setShouldShowSetting(true);
  }

  function hideSetting() {
    setShouldShowSetting(false);
  }

  return (
    <Box
      as="button"
      onMouseEnter={showSetting}
      onMouseLeave={hideSetting}
      pb={4}
      className={styles.memberContribution_wrapper}
      data-testid="contributionContainer"
    >
      {task.id ? (
        <Link
          href={`${URL}${task.id}`}
          isExternal
          className={styles.memberContribution_taskHeading}
        >
          {taskTitle}
        </Link>
      ) : (
        <Link
          href={`${task.url}`}
          isExternal
          className={styles.memberContribution_taskHeading}
        >
          {taskTitle}
        </Link>
      )}
      <Text mt={'0.4rem'} mb={'0.2rem'} color={'#636363'}>
        {purpose}
      </Text>
      <DeliveryDetails isTitle={isTitle} task={task} />
      <Box display={'flex'} justifyContent={'center'} mt={'0.5rem'}>
        {prUrl && (
          <Link
            as={NextLink}
            href={`${featureUrl || url}`}
            color={'#a39797'}
            className={styles.memberContribution_link}
            fontWeight={400}
          >
            Check out this feature in action
          </Link>
        )}
      </Box>
      {id && shouldShowSetting && isSuperUser && (
        <Button
          onClick={() => openTaskStatusUpdateModal(id, isNoteworthy)}
          position="absolute"
          top="0"
          right="-10px"
          background="none"
          _hover={{ bg: 'none' }}
          data-testId="settingButton"
        >
          <Image src="/icons/setting.svg" alt="" width={15} height={15} />
        </Button>
      )}
    </Box>
  );
}
