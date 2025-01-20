function Facebook({ className, size }: { className?: string; size?: string }) {
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
        d="M17.1768 13.2815L17.7944 9.33009H13.931V6.76585C13.931 5.6848 14.4707 4.63107 16.2011 4.63107H17.9577V1.26701C17.9577 1.26701 16.3635 1 14.8395 1C11.6576 1 9.57793 2.89243 9.57793 6.31846V9.33009H6.04102V13.2815H9.57793V22.8339C10.2871 22.9432 11.014 23 11.7545 23C12.495 23 13.2219 22.9432 13.931 22.8339V13.2815H17.1768Z"
        fill="#0B0C0C"
      />
    </svg>
  );
}

export default Facebook;
