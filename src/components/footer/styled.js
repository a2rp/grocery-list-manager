import styled from "styled-components";

export const Styled = {
    Footer: styled.footer`margin-top: 2rem; padding: 2rem max(18px, 4vw); border-top: 1px solid hsl(0 0% 100% / .12); background: hsl(0 0% 100% / .025);`,
    FooterInner: styled.div`max-width: 980px; margin: auto; display: flex; justify-content: space-between; gap: 2rem; flex-wrap: wrap;`,
    Brand: styled.p`font-size: 1.05rem; font-weight: 700; color: #fff; margin: 0;`,
    Columns: styled.div`display: flex; gap: 3rem; flex-wrap: wrap;`,
    Column: styled.div`display: grid; gap: .55rem; min-width: 150px; a { display: flex; align-items: center; gap: .45rem; color: inherit; text-decoration: none; transition: color .2s, transform .2s; } a:hover { color: #fff; transform: translateX(3px); } svg { color: #8f9cff; }`,
    Label: styled.strong`color: #fff; margin-bottom: .15rem;`,
    Copyright: styled.p`max-width: 980px; margin: 1.7rem auto 0; padding-top: 1rem; border-top: 1px solid hsl(0 0% 100% / .08); font-size: .8rem; a { color: #fff; }`,
};
