import React from 'react';
import { cleanup, render, fireEvent } from '../test-utils.js';
import { Tooltip } from './tooltip.js';

describe('govieTooltip', () => {
  afterEach(cleanup);

  const renderTooltip = (props: React.ComponentProps<typeof Tooltip>) =>
    render(<Tooltip {...props}>Hover me</Tooltip>);

  it('should render the child component', () => {
    const screen = renderTooltip({
      text: 'Tooltip Text',
      position: 'top',
      children: <button>Hover me</button>,
    });
    const childElement = screen.getByText('Hover me');

    expect(childElement).toBeTruthy();
  });

  it('should not show tooltip initially', () => {
    const screen = renderTooltip({
      text: 'Tooltip Text',
      position: 'top',
      children: <button>Hover me</button>,
    });
    const tooltipTextElement = screen.queryByText('Tooltip Text');

    expect(tooltipTextElement).not.toBeInTheDocument();
  });

  it('should show tooltip on mouse enter', () => {
    const screen = renderTooltip({
      text: 'Tooltip Text',
      position: 'top',
      children: <button>Hover me</button>,
    });
    const wrapperElement = screen.getByText('Hover me');

    fireEvent.mouseEnter(wrapperElement);

    const tooltipTextElement = screen.getByText('Tooltip Text');
    expect(tooltipTextElement).toBeInTheDocument();
  });

  it('should hide tooltip on mouse leave', () => {
    const screen = renderTooltip({
      text: 'Tooltip Text',
      position: 'top',
      children: <button>Hover me</button>,
    });
    const wrapperElement = screen.getByText('Hover me');

    fireEvent.mouseEnter(wrapperElement);
    const tooltipTextElement = screen.getByText('Tooltip Text');
    expect(tooltipTextElement).toBeInTheDocument();

    fireEvent.mouseLeave(wrapperElement);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  it.each(['top', 'bottom', 'left', 'right'] as const)(
    'should apply correct position class for %s position',
    (position) => {
      const screen = renderTooltip({
        text: 'Tooltip Text',
        position,
        children: <button>Hover me</button>,
      });

      fireEvent.mouseEnter(screen.getByText('Hover me'));

      const tooltipElement = screen.getByText('Tooltip Text');
      expect(tooltipElement).toHaveClass(`gi-tooltip-${position}`);
    },
  );

  it('should render tooltip with correct text', () => {
    const tooltipText = 'Test Tooltip Content';
    const screen = renderTooltip({
      text: tooltipText,
      position: 'top',
      children: <button>Hover me</button>,
    });

    fireEvent.mouseEnter(screen.getByText('Hover me'));

    const tooltipTextElement = screen.getByText(tooltipText);
    expect(tooltipTextElement).toBeInTheDocument();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTooltip({
      text: 'Accessibility Tooltip',
      position: 'top',
      children: <button>Hover me</button>,
    });

    await screen.axe();
  });
});
