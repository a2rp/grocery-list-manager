import styled from "styled-components";

const border = "1px solid hsl(0 0% 100% / 0.12)";

export const Styled = {
    Footer: styled.footer`
        margin-top: 2rem;
        padding: 2rem max(18px, 4vw) 1.25rem;
        border-top: ${border};
        background: hsl(220 20% 7% / 0.8);
    `,
    FooterInner: styled.div`
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;
    `,
    Brand: styled.p`
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin: 0;
        color: #fff;
        font-size: 1rem;
        font-weight: 700;

        img {
            width: 32px;
            height: 32px;
            object-fit: contain;
            border-radius: 8px;
            border: ${border};
        }
    `,
    SocialLinks: styled.nav`
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    `,
    IconLink: styled.a`
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        border: ${border};
        border-radius: 9px;
        color: #b7bfcc;
        text-decoration: none;
        transition: color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;

        &:hover,
        &:focus-visible {
            color: #fff;
            border-color: hsl(226 100% 72% / 0.6);
            box-shadow: 0 0 0 3px hsl(226 100% 72% / 0.1);
            outline: none;
        }
    `,
    Copyright: styled.p`
        max-width: 1040px;
        margin: 1.25rem auto 0;
        padding-top: 1rem;
        border-top: 1px solid hsl(0 0% 100% / 0.08);
        color: #8993a3;
        font-size: 0.8rem;

        a {
            color: #fff;
        }
    `,
};
