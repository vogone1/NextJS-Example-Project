"use client";

import ThemeToggle from '@/src/components/atoms/ThemeToggle/ThemeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './Navbar.module.scss';

const links = [
    { href: '/', label: 'Home' },
    { href: '/cv', label: 'CV' },
    { href: '/projects', label: 'Projects' },
];

const Navbar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar} role="navigation" aria-label="Primary">
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
                <a className={styles.cta} href="#contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
