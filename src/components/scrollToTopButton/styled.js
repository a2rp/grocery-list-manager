import styled from "styled-components";

export const Styled = {
    Wrapper: styled.button`
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 40;
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border: 1px solid hsl(226 100% 72% / 0.55);
        border-radius: 999px;
        color: #fff;
        background: #171d2a;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;

        &[data-visible="true"] {
            opacity: 1;
            pointer-events: auto;
        }

        &:hover,
        &:focus-visible {
            border-color: #aeb8ff;
            box-shadow: 0 0 0 4px hsl(226 100% 72% / 0.14);
            outline: none;
        }
    `,
};
