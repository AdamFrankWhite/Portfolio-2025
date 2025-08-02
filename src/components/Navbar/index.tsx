import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("");
    useEffect(() => {
        // Check localStorage or system preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            // fallback to system preference
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (prefersDark) {
                setTheme("dark");
                document.documentElement.setAttribute("data-theme", "dark");
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    Adam White
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.burger}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X size={24} color="var(--foreground)" />
                    ) : (
                        <Menu size={24} color="var(--foreground)" />
                    )}
                </button>

                <div className={`${styles.links} ${isOpen ? styles.open : ""}`}>
                    <Link href="/about">About Me</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <span
                    onClick={toggleTheme}
                    style={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        zIndex: 1000,
                    }}
                >
                    {theme === "dark" ? <Sun /> : <Moon />}
                </span>
            </nav>
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </header>
    );
}
