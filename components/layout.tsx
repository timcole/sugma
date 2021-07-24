import { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from 'components/header';
import { Section } from 'components/section';

export const Layout: FunctionComponent = ({ children }) => {
  const [menuClicked, setMenuClicked] = useState<EventTarget>();

  return (
    <Body onClick={(e) => setMenuClicked(e.target)}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥜</text></svg>"
        />
        <title>SUGMA - Short URLs Get More Attention</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header clicked={menuClicked} />
      <Content>{children}</Content>
      <Footer>
        Copyright &copy; 1997-{new Date().getFullYear()} - Timothy Cole - All
        Rights Reserved.
      </Footer>
    </Body>
  );
};

const Body = styled.div`
  position: relative;
  background-color: var(--background_100);
  width: 100%;
  height: 325px;
  z-index: 0;

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--header_100);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    transform-origin: top left;
    transform: skewY(-3deg);
  }

  ${Section} {
    margin: 15px auto;
    width: calc(100% - 60px);
    max-width: 1000px;
    padding: 15px;
  }
`;

const Content = styled.div`
  min-height: 200px;
`;

const Footer = styled.div`
  padding: 25px 0;
  text-align: center;
  opacity: 0.7;
  color: var(--content_text);
`;
