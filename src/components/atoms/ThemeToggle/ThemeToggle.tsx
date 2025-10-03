'use client';

import React from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = React.useState(false);

    // Resolve theme on client after mount to avoid SSR hydration mismatch
    React.useEffect(() => {
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
    React.useEffect(() => {
        if (!mounted || !theme) return;
        try { localStorage.setItem('theme', theme); } catch { }
        document.documentElement.dataset.theme = theme;
    }, [theme, mounted]);

    const nextLabel = theme === 'light' ? 'dark' : 'light';

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${nextLabel} mode`}
            aria-pressed={theme === 'dark'}
            title="Toggle theme"
        >
            {!mounted || !theme ? (
                <span className={styles.placeholder} aria-hidden="true" />
            ) : theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.22 19.78l1.79-1.79-1.8-1.8-1.79 1.8 1.8 1.79zM20 11v2h3v-2h-3zm-2.76-6.16l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41zM12 5a7 7 0 1 0 7 7 7 7 0 0 0-7-7z" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
