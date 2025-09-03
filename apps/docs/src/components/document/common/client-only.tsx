'use-client';

import { useEffect, useState } from 'react';

export const ClientOnly = ({
  children,
  onClientReady,
}: {
  children: React.ReactNode;
  onClientReady: Function;
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    onClientReady(true);
  }, [onClientReady, setMounted]);

  if (!isMounted) return null;

  return children;
};
