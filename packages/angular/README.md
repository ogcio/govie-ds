# Government of Ireland Design System – Angular

Welcome to the Government of Ireland Design System Angular component library, a collection of reusable Angular components designed to help you build modern Angular web applications utilising the Government of Ireland Design System.

## Getting Started

To install the library, use the following command:

```
npm install @ogcio/design-system-angular
```

### Usage

Use components within your application from the `@ogcio/design-system-angular` component package:

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
