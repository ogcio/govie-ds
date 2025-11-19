## Installation

```sh
npm install @ogcio/design-system-assets-font-400
```

## Usage

Import in JS (example: `src/index.js` in Create React App, `src/main.js` in Vue CLI):

```js
import "@ogcio/design-system-assets-font-400";
```

or import in CSS (example: `src/styles.css` in Angular CLI):

```css
@import "@ogcio/design-system-assets-font-400";
```

or import in HTML:

```html
<link
  href="/path/to/@ogcio/design-system-assets-font-400/index.css"
  rel="stylesheet"
/>
```

To display an icon, use one of the following:

```html
<span class="material-symbols-outlined">face</span>
<!-- Outlined -->
<span class="material-symbols-rounded">face</span>
<!-- Rounded -->
<span class="material-symbols-sharp">face</span>
<!-- Sharp -->
```

To customize the variable font axes (fill), use:

```css
.material-symbols-outlined {
  font-variation-settings: "FILL" 0;
}
```

### Reducing Build Size

The default `index.css` includes CSS for all fonts. This may cause build tools such as webpack to copy all fonts to the build directory even if you are not using all of them. To reduce the build size, import only the styles you need. For example, if you only need outlined icons, import `outlined.css` instead of the default `index.css`:

```diff
-import '@material-symbols/font-400';
+import '@material-symbols/font-400/outlined.css';
```

<details>
<summary><strong>Show all</strong></summary><br>

| Icons    | CSS          | Sass          |
| :------- | :----------- | :------------ |
| Outlined | outlined.css | outlined.scss |
| Rounded  | rounded.css  | rounded.scss  |
| Sharp    | sharp.css    | sharp.scss    |

</details>

### Using Sass

Import in Sass (example: `src/styles.scss` in Angular CLI):

```scss
@import "@ogcio/design-system-assets-font-400";
```

If you are getting errors with webpack or Vue CLI, add this line before importing:

```scss
$material-symbols-font-path: "~@ogcio/design-system-assets-font-400";
```

### Using Angular `mat-icon`

To display an icon, use one of the following:

```html
<mat-icon fontSet="material-symbols-outlined">face</mat-icon>
<mat-icon fontSet="material-symbols-rounded">face</mat-icon>
<mat-icon fontSet="material-symbols-sharp">face</mat-icon>
```

## License

Material Symbols are created by [Google](https://github.com/google/material-design-icons#license).
