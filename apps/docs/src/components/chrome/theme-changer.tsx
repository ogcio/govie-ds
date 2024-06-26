'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select value={theme} onChange={(event) => setTheme(event.target.value)}>
      <option value="govie-light">Gov.ie Light</option>
      <option value="govie-dark">Gov.ie Dark</option>
      <option value="hse-light">HSE Light</option>
      <option value="hse-dark">HSE Dark</option>
    </select>
  );
}
