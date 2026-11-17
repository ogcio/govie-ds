import { Component, Input } from '@angular/core';
import CoreSideNavHeading, { type Props } from '../atoms/sidenav/SideNavHeading';
import { headingListItemClasses } from '../atoms/sidenav/SideNavItem.styles';

@Component({
  selector: 'gi-side-nav-heading',
  standalone: true,
  imports: [CoreSideNavHeading],
  template: `
    <li [class]="headingListItemClasses()">
      <core-side-nav-heading [className]="class" [id]="id" [dataTestId]="dataTestId">
        <ng-content />
      </core-side-nav-heading>
    </li>
  `,
  styles: [':host { display: contents; }'],
  host: {
    '[attr.id]': 'null',
    '[attr.class]': 'null',
    '[attr.datatestid]': 'null',
  },
})
export class GiSideNavHeading {
  headingListItemClasses = headingListItemClasses;

  @Input() class = '';
  @Input() id: Props['id'];
  @Input() dataTestId: Props['dataTestId'];
}
