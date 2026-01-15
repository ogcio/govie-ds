/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@ogcio/govie-component-library/components';

import { defineCustomElement as defineGovieButton } from '@ogcio/govie-component-library/components/govie-button.js';
import { defineCustomElement as defineGovieParagraph } from '@ogcio/govie-component-library/components/govie-paragraph.js';
@ProxyCmp({
  defineCustomElementFn: defineGovieButton,
  inputs: ['appearance', 'class', 'disabled', 'size', 'variant']
})
@Component({
  selector: 'govie-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'class', 'disabled', 'size', 'variant'],
})
export class GovieButton {
  protected el: HTMLGovieButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface GovieButton extends Components.GovieButton {}


@ProxyCmp({
  defineCustomElementFn: defineGovieParagraph,
  inputs: ['align', 'as', 'size', 'whitespace']
})
@Component({
  selector: 'govie-paragraph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'as', 'size', 'whitespace'],
})
export class GovieParagraph {
  protected el: HTMLGovieParagraphElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface GovieParagraph extends Components.GovieParagraph {}


