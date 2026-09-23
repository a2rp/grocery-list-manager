import { createElement } from "react";
import { FaCodepen, FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { FiCoffee, FiHeart, FiMail, FiMessageCircle, FiUser } from "react-icons/fi";
import { Styled } from "./styled";

const links = [
    ["Portfolio", "https://www.ashishranjan.net", FiUser],
    ["GitHub", "https://github.com/a2rp", FaGithub],
    ["CodePen", "https://codepen.io/ash1198", FaCodepen],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FaLinkedin],
    ["Facebook", "https://www.facebook.com/theash.ashish/", FaFacebook],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FaYoutube],
    ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
];

const support = [
    ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
    ["Patreon", "https://patreon.com/a2rp", FiMessageCircle],
];

const allLinks = [...links, ...support];

export default function Footer() {
    return (
        <Styled.Footer>
            <Styled.FooterInner>
                <Styled.Brand>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>Plan smarter. Shop easier.</span>
                </Styled.Brand>
                <Styled.SocialLinks aria-label="Developer and support links">
                    {allLinks.map(([label, href, IconComponent]) => (
                        <Styled.IconLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                            {createElement(IconComponent, { "aria-hidden": true })}
                        </Styled.IconLink>
                    ))}
                </Styled.SocialLinks>
            </Styled.FooterInner>
            <Styled.Copyright>
                Copyright &copy; {new Date().getFullYear()} {" "}
                <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a>
            </Styled.Copyright>
        </Styled.Footer>
    );
}
