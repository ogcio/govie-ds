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
    this.getAllTooltips = document.querySelectorAll('.gi-tooltip-wrapper');

    this.handleTooltipVisibility = this.handleTooltipVisibility.bind(this);
  }

  handleTooltipVisibility(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const tooltip = wrapper.querySelector('[role="tooltip"]');

    if (!wrapper || !tooltip) return;

    if (event.type === 'mouseenter') {
      tooltip.setAttribute('aria-hidden', 'false');
    } else if (event.type === 'mouseleave') {
      tooltip.setAttribute('aria-hidden', 'true');
    }
  }

  initComponent() {
    for (const tooltipWrapper of this.getAllTooltips) {
      tooltipWrapper.addEventListener('mouseenter', this.handleTooltipVisibility, false);
      tooltipWrapper.addEventListener('mouseleave', this.handleTooltipVisibility, false);
    }
  }

  destroyComponent(): void {
    for (const tooltipWrapper of this.getAllTooltips) {
      tooltipWrapper.removeEventListener(
        'mouseenter', 
        this.handleTooltipVisibility, 
        false
      );
      tooltipWrapper.removeEventListener(
        'mouseleave', 
        this.handleTooltipVisibility, 
        false
      );
    }
  }
}

export const initTooltip = initialiseModule({
  name: 'tooltip',
  component: 'Tooltip',
});