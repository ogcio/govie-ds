import type { SVGProps } from 'react';

export interface ChatBubbleProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export function ChatBubble({ size = 24, ...props }: ChatBubbleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      <path d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z"/>
    </svg>
  );
}

export default ChatBubble;
