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

export default function Footer() {
    return <Styled.Footer>
        <Styled.FooterInner>
            <Styled.Brand>Plan smarter. Shop easier.</Styled.Brand>
            <Styled.Columns>
                <Styled.Column><Styled.Label>Links</Styled.Label>{links.map(([label, href, IconComponent]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><IconComponent />{label}</a>)}</Styled.Column>
                <Styled.Column><Styled.Label>Support</Styled.Label>{support.map(([label, href, IconComponent]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><IconComponent />{label}</a>)}</Styled.Column>
            </Styled.Columns>
        </Styled.FooterInner>
        <Styled.Copyright>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></Styled.Copyright>
    </Styled.Footer>;
}
