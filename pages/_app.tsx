import IdentityProvider from 'components/identity';
import { Layout } from 'components/layout';
import { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --header_100: 59, 58, 71;
    --background_100: #E5E5E5;
    --background_200: #FFFFFF;
    --background_300: #F9F9F9;
    --header_text: #FFFFFF;
    --content_text: #1A1A1A;
    --header_active: #4B4A56;
    --accent: #7594E1;
    --error: #922e24;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --header_100: 33, 39, 47;
      --background_100: #191F26;
      --background_200: #1D222B;
      --background_300: #1A1E26;
      --header_text: #FFFFFF;
      --content_text: #FFFFFF;
      --header_active: #4A4E56;
    }
  }

  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    background: var(--background_100);
    color: var(--content_text);
    font-family: 'Lato', sans-serif;
  }
`;

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <IdentityProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </IdentityProvider>
  );
};

export default App;
