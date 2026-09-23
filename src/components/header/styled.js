import styled from "styled-components";

const border = "1px solid hsl(0 0% 100% / 0.12)";
const NavigationLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 11px;
    border: 1px solid transparent;
    border-radius: 9px;
    color: #b7bfcc;
    text-decoration: none;
    transition: color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;

    svg { font-size: 16px; }

    &:hover,
    &:focus-visible {
        color: #fff;
        border-color: hsl(226 100% 72% / 0.5);
        box-shadow: 0 0 0 3px hsl(226 100% 72% / 0.1);
        outline: none;
    }

    @media (max-width: 620px) {
        width: 100%;
    }
`;

export const Styled = {
    Header: styled.header`
        position: fixed;
        inset: 0 0 auto;
        z-index: 50;
        background: hsl(220 20% 7% / 0.92);
        border-bottom: ${border};
        backdrop-filter: blur(16px);
    `,
    Inner: styled.div`
        width: min(1040px, calc(100% - 36px));
        min-height: 72px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    `,
    Brand: styled.a`
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: #fff;
        text-decoration: none;

        img {
            width: 38px;
            height: 38px;
            object-fit: contain;
            border-radius: 10px;
            border: ${border};
        }

        span {
            display: grid;
            gap: 2px;
        }

        small {
            color: #8f9cff;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.14em;
        }

        strong {
            font-family: "Antonio", sans-serif;
            font-size: 20px;
            letter-spacing: 0.02em;
        }
    `,
    Navigation: styled.nav`
        display: flex;
        align-items: center;
        gap: 8px;

        @media (max-width: 620px) {
            position: absolute;
            inset: 72px 18px auto;
            display: ${({ $open }) => ($open ? "grid" : "none")};
            padding: 10px;
            border: ${border};
            border-radius: 14px;
            background: #111721;
            box-shadow: 0 18px 40px hsl(0 0% 0% / 0.36);
        }
    `,
    NavigationLink,
    GitHubLink: styled(NavigationLink)`
        color: #fff;
        border-color: hsl(0 0% 100% / 0.18);
    `,
    MenuButton: styled.button`
        display: none;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border: ${border};
        border-radius: 9px;
        color: #fff;
        background: transparent;
        cursor: pointer;
        transition: border-color 180ms ease, box-shadow 180ms ease;

        &:hover,
        &:focus-visible {
            border-color: hsl(226 100% 72% / 0.55);
            box-shadow: 0 0 0 3px hsl(226 100% 72% / 0.1);
            outline: none;
        }

        @media (max-width: 620px) {
            display: inline-flex;
        }
    `,
};
