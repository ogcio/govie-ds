import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type TooltipProps = BaseComponentOptions;

export class Tooltip extends BaseComponent<TooltipProps> {
  getAllTooltips: NodeListOf<HTMLElement>;

  constructor(options: TooltipProps) {
    super(options);
    this.getAllTooltips = document?.querySelectorAll('.gi-tooltip-wrapper');

    this.handleTooltipVisibility = this.handleTooltipVisibility.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleTooltipVisibility(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const tooltip = wrapper.querySelector('[role="tooltip"]');

    if (!wrapper || !tooltip) {
      return;
    }

    if (event.type === 'mouseenter') {
      tooltip.setAttribute('aria-hidden', 'false');
    } else if (
      event.type === 'mouseleave' &&
      !wrapper.contains(document?.activeElement)
    ) {
      tooltip.setAttribute('aria-hidden', 'true');
    }
  }

  handleFocus(event: FocusEvent) {
    const wrapper = (event.target as HTMLElement).closest(
      '.gi-tooltip-wrapper',
    );
    const tooltip = wrapper?.querySelector('[role="tooltip"]');

    if (wrapper && tooltip) {
      tooltip.setAttribute('aria-hidden', 'false');
    }
  }

  handleBlur(event: FocusEvent) {
    const wrapper = (event.target as HTMLElement).closest(
      '.gi-tooltip-wrapper',
    );
    const tooltip = wrapper?.querySelector('[role="tooltip"]');

    const relatedTarget = event.relatedTarget as HTMLElement;
    if (wrapper && tooltip && !wrapper.contains(relatedTarget)) {
      tooltip.setAttribute('aria-hidden', 'true');
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      for (const wrapper of this.getAllTooltips) {
        const tooltip = wrapper.querySelector('[role="tooltip"]');
        if (tooltip && tooltip.getAttribute('aria-hidden') === 'false') {
          tooltip.setAttribute('aria-hidden', 'true');

          if (wrapper.contains(document?.activeElement)) {
            (document?.activeElement as HTMLElement).focus();
          }
        }
      }
    }
  }

  hideAllTooltips() {
    for (const wrapper of this.getAllTooltips) {
      const tooltip = wrapper.querySelector('[role="tooltip"]');
      if (tooltip) {
        tooltip.setAttribute('aria-hidden', 'true');
      }
    }
  }

  private truncateText(text: string): string {
    return text.length > 100 ? text.slice(0, 100).trim() + '...' : text;
  }

  initComponent() {
    for (const wrapper of this.getAllTooltips) {
      const tooltipElement = wrapper.querySelector('[role="tooltip"]');
      if (tooltipElement) {
        const originalText = tooltipElement.textContent || '';
        tooltipElement.textContent = this.truncateText(originalText);
      }
    }

    for (const tooltipWrapper of this.getAllTooltips) {
      tooltipWrapper.addEventListener(
        'mouseenter',
        this.handleTooltipVisibility,
        false,
      );
      tooltipWrapper.addEventListener(
        'mouseleave',
        this.handleTooltipVisibility,
        false,
      );
      tooltipWrapper.addEventListener('focusin', this.handleFocus, false);
      tooltipWrapper.addEventListener('focusout', this.handleBlur, false);
    }

    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  destroyComponent(): void {
    for (const tooltipWrapper of this.getAllTooltips) {
      tooltipWrapper.removeEventListener(
        'mouseenter',
        this.handleTooltipVisibility,
        false,
      );
      tooltipWrapper.removeEventListener(
        'mouseleave',
        this.handleTooltipVisibility,
        false,
      );
      tooltipWrapper.removeEventListener('focusin', this.handleFocus, false);
      tooltipWrapper.removeEventListener('focusout', this.handleBlur, false);
    }
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }
}

export const initTooltip = initialiseModule({
  name: 'tooltip',
  component: 'Tooltip',
});
