/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@ogcio/govie-component-library/components';

import { defineCustomElement as defineGovieBoxButton } from '@ogcio/govie-component-library/components/govie-box-button.js';
import { defineCustomElement as defineGovieButton } from '@ogcio/govie-component-library/components/govie-button.js';
import { defineCustomElement as defineGovieParagraph } from '@ogcio/govie-component-library/components/govie-paragraph.js';
@ProxyCmp({
  defineCustomElementFn: defineGovieBoxButton,
  inputs: ['class', 'variant']
})
@Component({
  selector: 'govie-box-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['class', 'variant'],
  outputs: ['customClick'],
})
export class GovieBoxButton {
  protected el: HTMLGovieBoxButtonElement;
  @Output() customClick = new EventEmitter<CustomEvent<MouseEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface GovieBoxButton extends Components.GovieBoxButton {

  customClick: EventEmitter<CustomEvent<MouseEvent>>;
}


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
  outputs: ['customClick'],
})
export class GovieButton {
  protected el: HTMLGovieButtonElement;
  @Output() customClick = new EventEmitter<CustomEvent<MouseEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface GovieButton extends Components.GovieButton {

  customClick: EventEmitter<CustomEvent<MouseEvent>>;
}


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


