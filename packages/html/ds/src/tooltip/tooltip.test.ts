import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import html from './tooltip.html?raw';
import { TooltipProps } from './tooltip.schema';

describe('govieTooltip', () => {
  const renderTooltip = render<TooltipProps>({
    componentName: 'tooltip',
    macroName: 'govieTooltip',
    html,
  });

  testVariantsAxe(['top', 'bottom', 'left', 'right'], (position) =>
    renderTooltip({
      text: 'Tooltip Text',
      position,
      content: '<button>Hover me</button>',
    }),
  );

  it('should render the tooltip wrapper', () => {
    const screen = renderTooltip({
      content: '<button>Hover me</button>',
      text: 'Tooltip text',
      position: 'top',
    });

    const wrapper = screen.getByRole('button').closest('.gi-tooltip-wrapper');
    expect(wrapper).toBeTruthy();
    expect(wrapper?.classList.contains('gi-tooltip-wrapper')).toBe(true);
  });

  it('should render the tooltip with correct role and position', () => {
    const screen = renderTooltip({
      content: '<button>Hover me</button>',
      text: 'Tooltip text',
      position: 'bottom',
    });

    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip).toBeTruthy();
    expect(tooltip.classList.contains('gi-tooltip-bottom')).toBe(true);
  });

  it('should set aria-hidden to true by default', () => {
    const screen = renderTooltip({
      text: 'Tooltip text',
      position: 'top',
    });

    const tooltip = screen.getByText('Tooltip text');
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply aria-describedby to the wrapper if provided', () => {
    const screen = renderTooltip({
      text: 'Tooltip text',
      position: 'right',
      ariaDescribedBy: 'described-by-id',
    });

    const wrapper = screen
      .getByText('Tooltip text')
      .closest('.gi-tooltip-wrapper');
    expect(wrapper?.getAttribute('aria-describedby')).toBe('described-by-id');
  });

  it('should not set aria-describedby if not provided', () => {
    const screen = renderTooltip({
      text: 'Tooltip text',
      position: 'top',
    });

    const wrapper = screen
      .getByText('Tooltip text')
      .closest('.gi-tooltip-wrapper');
    expect(wrapper?.hasAttribute('aria-describedby')).toBe(false);
  });

  it('should render the wrapped content', () => {
    const screen = renderTooltip({
      content: '<button>Hover me</button>',
      text: 'Tooltip text',
      position: 'top',
    });

    const button = screen.getByRole('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Hover me');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTooltip({
      content: '<button>Hover me</button>',
      text: 'Tooltip text',
      position: 'top',
    });

    await screen.axe();
  });
});
