import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test__utils/renderWithProvides';
import { noteworthyTasks, allContributions } from '../../../../mocks/db/tasks';
import ContributionAccordianItem from '../../../../components/MemberContribution/ContributionAccordianItem';
import DeliveryDetails from '../../../../components/MemberContribution/DeliveryDetails';

describe('ContributionAccordianItem', () => {
  test('should render correctly if all details are present', () => {
    const openTaskStatusUpdateModal = jest.fn();

    const task = noteworthyTasks[0].task;
    const isOptionKeyPressed = true;

    const { container } = renderWithProviders(
      <ContributionAccordianItem
        task={task}
        key={0}
        isTitle={true}
        openTaskStatusUpdateModal={openTaskStatusUpdateModal}
      />,
    );

    const contributionContainer = screen.getByTestId('contributionContainer');
    expect(contributionContainer).toBeInTheDocument();
    fireEvent.mouseEnter(contributionContainer);
    expect(container).toBeTruthy();
    expect(isOptionKeyPressed).toBe(true);
    fireEvent.mouseLeave(contributionContainer);

    const { container: deliveryDetails } = renderWithProviders(
      <DeliveryDetails isTitle={false} task={task} />,
    );
    expect(deliveryDetails).toBeInTheDocument();

    const contributionHeading = screen.getByRole('link', {
      name: 'Make Real Dev Squad work!',
    });
    expect(contributionHeading).toBeInTheDocument();

    const completeDate = screen.getByText(/11 months/i);
    expect(completeDate).toBeInTheDocument();

    const featureUrl = screen.getByText('Check out this feature in action');
    expect(featureUrl).toBeInTheDocument();
  });

  test('should not render featureUrl if url or featureUrl is not present', async () => {
    const openTaskStatusUpdateModal = jest.fn();

    const task = allContributions.all[2].task;

    renderWithProviders(
      <ContributionAccordianItem
        task={task}
        key={0}
        isTitle={false}
        openTaskStatusUpdateModal={openTaskStatusUpdateModal}
      />,
    );

    const { container } = renderWithProviders(
      <DeliveryDetails isTitle={false} task={task} />,
    );
    expect(container).toBeInTheDocument();

    const contributionHeading = screen.getByRole('link', {
      name: '[Design doc] For deciding the final indexes on the table.',
    });
    expect(contributionHeading).toBeInTheDocument();
  });

  test('should render N/A if startedOn or endsOn date is not present', () => {
    const openTaskStatusUpdateModal = jest.fn();

    const task = allContributions.all[3].task;

    renderWithProviders(
      <ContributionAccordianItem
        task={task}
        key={0}
        isTitle={true}
        openTaskStatusUpdateModal={openTaskStatusUpdateModal}
      />,
    );

    const { container } = renderWithProviders(
      <DeliveryDetails isTitle={false} task={task} />,
    );
    expect(container).toBeInTheDocument();

    const contributionContainer = screen.getByTestId('contributionContainer');
    expect(contributionContainer).toBeInTheDocument();

    const contributionHeading = screen.getByRole('link', {
      name: 'Create multiple Extension Requests',
    });
    expect(contributionHeading).toBeInTheDocument();

    const completeDate = screen.getByText('N/A');
    expect(completeDate).toBeInTheDocument();
  });
});
