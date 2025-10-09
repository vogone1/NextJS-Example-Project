'use client';

import ToggleSwitch from '@/src/components/animata/button/ToggleSwitch';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = useState(false);

    // Resolve theme on client after mount to avoid SSR hydration mismatch
    useEffect(() => {
        setMounted(true);
        try {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
            const initial: 'light' | 'dark' = stored === 'light' || stored === 'dark'
                ? (stored as 'light' | 'dark')
                : prefersDark ? 'dark' : 'light';
            setTheme(initial);
            document.documentElement.dataset.theme = initial;
        } catch {
            // Fallback without localStorage
            const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
            const initial: 'light' | 'dark' = prefersDark ? 'dark' : 'light';
            setTheme(initial);
            document.documentElement.dataset.theme = initial;
        }
    }, []);

    // Persist changes and update DOM attribute when theme changes after mount
    useEffect(() => {
        if (!mounted || !theme) return;
        try { localStorage.setItem('theme', theme); } catch { }
        document.documentElement.dataset.theme = theme;
    }, [theme, mounted]);

    const isDark = theme === 'dark';

    // Icon for the theme the user can switch to (activatable state)
    const activatableIcon = isDark
        ? <Sun size={14} aria-hidden color='black' />
        : <Moon size={14} aria-hidden color='black' />;

    const onToggle = (checked: boolean) => {
        const t = checked ? 'dark' : 'light';
        setTheme(t); // update context/state
        // reflect immediately on the DOM
        document.documentElement.dataset.theme = t;
        // persist for SSR on next request
        document.cookie = [
            `theme=${t}`,
            'Path=/',
            'SameSite=Lax',
            'Max-Age=31536000',
            window.location.protocol === 'https:' ? 'Secure' : undefined,
        ].filter(Boolean).join('; ');
        // optional: keep localStorage for client-only reads
        try { localStorage.setItem('theme', t); } catch { }
    };

    return (
        <ToggleSwitch
            checked={isDark}
            onChange={onToggle}
            ariaLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title="Toggle theme"
            offIcon={null}
            onIcon={null}
            //icon on the opposite side of the thumb
            trackLeftIcon={isDark ? activatableIcon : null}
            trackRightIcon={!isDark ? activatableIcon : null}
        />
    );
}
