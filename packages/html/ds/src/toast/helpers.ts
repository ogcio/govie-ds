// @ts-expect-error The TS error is necessary as we are integrating the notyf library within our repo and thus no longer the libraries declarations
import { Notyf } from './assets/notyf.min.js';
import { ToastProps } from './types.js';

const notyfInstance = new Notyf();

// template to render Toast in front end side
const TOAST_TEMPLATE = `
<div data-module="gieds-dsToast" class="gi-toast-base gi-toast-{{variant}}" role="alert">
  <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[32px]">
    {{icon}}
  </span>
  <div class="gi-toast-container">
    <p class="gi-toast-title">{{title}}</p>
    <p class="gi-paragraph-md gi-text-start gi-whitespace-normal gi-max-w-prose">
        {{description}}
    </p>
  </div>
</div>
`;

const getIcon = (variant: string) => {
  switch (variant) {
    case 'warning': {
      return 'warning';
    }
    case 'success': {
      return 'check_circle';
    }
    case 'danger': {
      return 'error';
    }
    default: {
      return 'info';
    }
  }
};

export function createToastByTemplate({
  title,
  description = '',
  variant = 'success',
}: ToastProps) {
  const toastWrapper = document.createElement('div');
  const replacements = {
    '{{variant}}': variant,
    '{{icon}}': getIcon(variant),
    '{{title}}': title,
    '{{description}}': description,
  } as any;

  let toastHTML = TOAST_TEMPLATE;
  for (const key of Object.keys(replacements)) {
    // eslint-disable-next-line unicorn/prefer-string-replace-all
    toastHTML = toastHTML.replace(new RegExp(key, 'g'), replacements[key]);
  }

  toastWrapper.innerHTML = toastHTML;

  return toastWrapper;
}

export const createToast = (props: ToastProps) => {
  if (!notyfInstance) {
    return;
  }

  const toastWrapper = createToastByTemplate(props);

  notyfInstance.open({
    type: 'open',
    message: toastWrapper.innerHTML,
    duration: props.duration,
    position: props.position,
  });
};
