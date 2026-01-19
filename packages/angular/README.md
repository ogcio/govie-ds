# @ogcio/design-system-angular

The Government of Ireland Design System Angular components.

## Installation

```bash
npm install @ogcio/design-system-angular
```

## Usage

Import the components you need in your Angular module or component:

```typescript
import { Component } from '@angular/core';
import { DsButton } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-root',
  imports: [DsButton],
  template: '<ds-button>Click me</ds-button>'
})
export class AppComponent {}
```

## Development

This package is generated using Mitosis.
To generate components, run `pnpm build:angular` in the root directory.
To build the package, run `pnpm build` in this directory.
