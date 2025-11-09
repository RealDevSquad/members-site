import { ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';
import Image from 'next/image';
import { HOME_URL, NAV_LINKS } from './NavbarConstant';
import Link from 'next/link';

import { UserProfileWithGitHubLogin } from './components/UserProfileWithGitHubLogin';

import styles from './navbar.module.css';
import { NavbarTypes } from './types/navbar';

const NavbarDesktop: FC<NavbarTypes> = ({
  isLoggedIn,
  firstName,
  imageURL,
  setIsDropdownVisible,
}) => {
  const navItems = NAV_LINKS.map((link) => (
    <ListItem key={link.id} className={styles.navlist_items}>
      <Link href={link.link}>
        <Text className={styles.navlinks}>{link.name}</Text>
      </Link>
    </ListItem>
  ));

  return (
    <nav className={styles.navbar} data-testid="navbarDesktop">
      <UnorderedList listStyleType="none" className={styles.navbar_menu}>
        <ListItem>
          <Link href={HOME_URL}>
            <Image
              src="/images/Real-Dev-Squad@1x.svg"
              width={45}
              height={45}
              alt="RDS logo"
            />
          </Link>
        </ListItem>
        {navItems}
        <ListItem
          sx={{
            marginLeft: 'auto',
          }}
        >
          <UserProfileWithGitHubLogin
            isLoggedIn={isLoggedIn}
            firstName={firstName}
            imageURL={imageURL}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </ListItem>
      </UnorderedList>
    </nav>
  );
};

export default NavbarDesktop;
