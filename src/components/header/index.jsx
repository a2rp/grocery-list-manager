import { createElement, useState } from "react";
import { FiGithub, FiInfo, FiList, FiMenu, FiX } from "react-icons/fi";
import { Styled } from "./styled";

const navigation = [
    ["Grocery list", "#grocery-list", FiList],
    ["About", "#about", FiInfo],
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <Styled.Header>
            <Styled.Inner>
                <Styled.Brand href="#grocery-list" onClick={closeMenu}>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <small>LOCAL-FIRST TOOL</small>
                        <strong>Grocery List</strong>
                    </span>
                </Styled.Brand>

                <Styled.Navigation $open={menuOpen}>
                    {navigation.map(([label, href, Icon]) => (
                        <Styled.NavigationLink key={href} href={href} onClick={closeMenu}>
                            {createElement(Icon, { "aria-hidden": true })}
                            {label}
                        </Styled.NavigationLink>
                    ))}
                    <Styled.GitHubLink href="https://github.com/a2rp/grocery-list-manager" target="_blank" rel="noopener noreferrer">
                        <FiGithub aria-hidden="true" />
                        GitHub
                    </Styled.GitHubLink>
                </Styled.Navigation>

                <Styled.MenuButton type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
                    {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </Styled.MenuButton>
            </Styled.Inner>
        </Styled.Header>
    );
}
