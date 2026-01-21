import DsButton from './DsButton.lite'

export type BoxButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: (event: any) => void;
  children?: any;
};

export default function BoxButton (props: BoxButtonProps) {
  return (
    <div class={'p-4 rounded-md border border-slate-200 ' + (props.className ?? '')}>
      <DsButton variant={props.variant} onClick={(e) => props.onClick?.(e)}>
        {props.children}
      </DsButton>
    </div>
  )
}
