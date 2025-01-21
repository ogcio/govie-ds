function X({ className, size }: { className?: string; size?: string }) {
  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8623 10.4686L21.1542 2H19.4263L13.0947 9.3532L8.03772 2H2.20508L9.85224 13.1193L2.20508 22H3.93312L10.6194 14.2348L15.96 22H21.7926L13.8623 10.4686ZM4.55576 3.29968H7.20993L19.4271 20.7594H16.7729L4.55576 3.29968Z"
        fill="#0B0C0C"
      />
    </svg>
  );
}

export default X;
