import React from 'react'

export default function Footer() {
    return (
        <footer className="footer text-center footer-center bg-[#926c00] text-white p-4 mt-5">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved{" "}
                    <a
                        href="https://linkedin.com/in/musmanirfan"
                        className="link"
                        target="_blank"
                    >
                        Muhammad Usman
                    </a>
                </p>
            </aside>
        </footer>
    )
}
