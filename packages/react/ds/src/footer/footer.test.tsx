import { cleanup, renderComponent, screen } from '../test-utilities.test.js';
import { FooterProps, Footer } from './footer.js';

describe('Footer', () => {
  afterEach(cleanup);
  const renderFooter = (props: FooterProps = {}) =>
    renderComponent(<Footer {...props} />);

  it('should render the footer with default props', () => {
    renderFooter({
      dataTestid: 'govie-footer',
    });

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('aria-label', 'Footer');
    expect(footer).toHaveAttribute('data-testid', 'govie-footer');
    expect(footer).toHaveClass('gi-footer');
  });

  it('should render with custom className', () => {
    renderFooter({ className: 'custom-class' });

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('gi-footer custom-class');
  });

  it('should not render primary nav when primarySlot is not provided', () => {
    renderFooter({});

    expect(
      screen.queryByLabelText('Primary footer navigation'),
    ).not.toBeInTheDocument();
  });

  it('should render secondary slot when provided', () => {
    const secondaryContent = (
      <div data-testid="secondary-content">Secondary Content</div>
    );
    renderFooter({ secondarySlot: secondaryContent });

    expect(screen.getByTestId('secondary-content')).toBeInTheDocument();
  });

  it('should not render secondary nav when secondarySlot is not provided', () => {
    renderFooter({});

    expect(
      screen.queryByLabelText('Secondary footer navigation'),
    ).not.toBeInTheDocument();
  });

  it('should render utility slot when provided', () => {
    const utilityContent = (
      <div data-testid="utility-content">Utility Content</div>
    );
    renderFooter({ utilitySlot: utilityContent });

    const utilitySection = screen.getByLabelText('Footer Utility Links');
    expect(utilitySection).toBeInTheDocument();
    expect(screen.getByTestId('utility-content')).toBeInTheDocument();
  });

  it('should not render utility section when utilitySlot is not provided', () => {
    renderFooter({});

    expect(screen.queryByLabelText('Utility links')).not.toBeInTheDocument();
  });

  it('should render all slots when provided', () => {
    renderFooter({
      primarySlot: <div data-testid="primary">Primary</div>,
      secondarySlot: <div data-testid="secondary">Secondary</div>,
      utilitySlot: <div data-testid="utility">Utility</div>,
    });

    expect(screen.getByTestId('primary')).toBeInTheDocument();
    expect(screen.getByTestId('secondary')).toBeInTheDocument();
    expect(screen.getByTestId('utility')).toBeInTheDocument();
  });

  it('should pass axe tests', async () => {
    const screen = renderFooter({});

    await screen.axe();
  });
});
