export enum Breakpoint {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 480) {
    return Breakpoint.XS;
  }
  if (width < 640) {
    return Breakpoint.SM;
  }
  if (width < 768) {
    return Breakpoint.MD;
  }
  if (width < 1024) {
    return Breakpoint.LG;
  }
  return Breakpoint.XL;
};

export class BreakpointObserver {
  private breakpoint: Breakpoint;
  private width: number;
  private resizeHandler: () => void;

  constructor() {
    this.width = typeof window !== 'undefined' ? window.innerWidth : 0;
    this.breakpoint = getBreakpoint(this.width);

    this.resizeHandler = () => {
      this.width = window.innerWidth;
      this.breakpoint = getBreakpoint(this.width);
      this.onResize(this.breakpoint, this.width);
    };
  }

  /**
   * Initializes the breakpoint observer.
   * @param onResize - Callback executed when a resize occurs.
   */
  init(onResize: (breakpoint: Breakpoint, width: number) => void): void {
    this.onResize = onResize;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeHandler);
      // Trigger the callback with the initial values.
      this.onResize(this.breakpoint, this.width);
    }
  }

  /**
   * Destroys the breakpoint observer, removing the event listener.
   */
  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  getWidth(): number  {
    return this.width
  }

  getBreakpoint(): Breakpoint  {
    return this.breakpoint;
  }

  /**
   * Callback function triggered on window resize. Defaults to a no-op.
   */
  private onResize: (breakpoint: Breakpoint, width: number) => void = () => {};
}
