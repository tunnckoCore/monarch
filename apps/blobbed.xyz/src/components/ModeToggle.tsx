import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const [isDark, setIsDark] = React.useState<boolean>(true);

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        document.documentElement.classList[isDark ? 'remove' : 'add']('dark');
        setIsDark(!isDark);
      }}
    >
      {isDark ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
    </Button>
  );
}
