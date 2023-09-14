'use client';

import Icons from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const theme =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='px-0 w-9'>
          <Icons.Sun className='w-6 h-6 transition-all scale-100 rotate-0 stroke-foreground dark:-rotate-90 dark:scale-0' />
          <Icons.Moon className='absolute w-6 h-6 transition-all scale-0 rotate-90 fill-foreground dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`${
            theme === 'light' ? 'bg-accent text-foreground/80' : ''
          }`}
        >
          <Icons.Sun className='w-5 h-5 mr-2 stroke-foreground' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`${
            theme === 'dark' ? 'bg-accent text-foreground/80' : ''
          }`}
        >
          <Icons.Moon className='w-5 h-5 mr-2 fill-foreground' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`${
            theme === 'system' || theme === null
              ? 'bg-accent text-foreground/80'
              : ''
          }`}
        >
          <Icons.System className='w-5 h-5 mr-2 stroke-foreground' />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
