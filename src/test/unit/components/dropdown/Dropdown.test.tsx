import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test__utils/renderWithProvides';

import { DROPDOWN_LINKS } from '../../../../components/Dropdown/DropdownConstants';

import Dropdown from '../../../../components/Dropdown/Dropdown';

describe('Dropdown', () => {
  const setIsDropdownVisible = jest.fn();

  test('render dropdown items', () => {
    renderWithProviders(
      <Dropdown
        dropdownLinks={DROPDOWN_LINKS}
        setIsDropdownVisible={setIsDropdownVisible}
      />,
    );

    expect(DROPDOWN_LINKS).toHaveLength(6);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const userStatusLink = screen.getByRole('link', { name: 'Status' });
    expect(userStatusLink).toBeInTheDocument();

    const profileLink = screen.getByRole('link', { name: 'Profile' });
    expect(profileLink).toBeInTheDocument();

    const taskLink = screen.getByRole('link', { name: 'Tasks' });
    expect(taskLink).toBeInTheDocument();

    const identityLink = screen.getByRole('link', { name: 'Identity' });
    expect(identityLink).toBeInTheDocument();

    const signoutButton = screen.getByRole('button', { name: 'Sign out' });
    expect(signoutButton).toBeInTheDocument();
  });

  test('should navigate to a different route when a link is pressed', () => {
    renderWithProviders(
      <Dropdown
        dropdownLinks={DROPDOWN_LINKS}
        setIsDropdownVisible={setIsDropdownVisible}
      />,
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', 'https://www.realdevsquad.com');

    const userStatusLink = screen.getByRole('link', { name: 'Status' });
    expect(userStatusLink).toBeInTheDocument();
    expect(userStatusLink).toHaveAttribute(
      'href',
      'https://www.realdevsquad.com/status',
    );

    const profileLink = screen.getByRole('link', { name: 'Profile' });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute(
      'href',
      'https://www.realdevsquad.com/profile',
    );

    const taskLink = screen.getByRole('link', { name: 'Tasks' });
    expect(taskLink).toBeInTheDocument();
    expect(taskLink).toHaveAttribute(
      'href',
      'https://status.realdevsquad.com/tasks',
    );

    const identityLink = screen.getByRole('link', { name: 'Identity' });
    expect(identityLink).toBeInTheDocument();
    expect(identityLink).toHaveAttribute(
      'href',
      'https://www.realdevsquad.com/identity',
    );

    const signoutButton = screen.getByRole('button', { name: 'Sign out' });
    expect(signoutButton).toBeInTheDocument();

    fireEvent.click(signoutButton);
  });
});
