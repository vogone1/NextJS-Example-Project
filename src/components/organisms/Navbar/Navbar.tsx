"use client";

import CursorToggle from '@/src/components/atoms/ThemeToggle/CursorToggle';
import ThemeToggle from '@/src/components/atoms/ThemeToggle/ThemeToggle';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

const links = [
    { href: '/', label: 'Home' },
    { href: '/cv', label: 'CV' },
    { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={clsx(styles.navbar, 'u-noSelect')} role="navigation" aria-label="Primary">
            <div className={styles.logo}>
                <Link href="/">Leon Rougier</Link>
            </div>

            <ul className={styles.links}>
                {links.map(({ href, label }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${styles.link} ${isActive ? styles.active : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.right}>
                <ThemeToggle />
                <CursorToggle />
                <a className={styles.cta} href="#contact">Contact</a>
            </div>
        </nav>
    );
}
