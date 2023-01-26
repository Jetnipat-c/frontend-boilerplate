import 'public/styles/globals.css';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import createEmotionCache from '@/app/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import ProgressBar from '@badrap/bar-of-progress';
import { Router, useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { theme } from 'public/theme/themes';
import { store } from '@/app/store/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  Layout?: React.FC;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & any;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const progress = new ProgressBar({
  size: 4,
  className: 'bar-of-progress',
  delay: 100,
});

// eslint-disable-next-line react/jsx-no-useless-fragment, react/function-component-definition
const TemporaryLayout: FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const Layout = Component.Layout || TemporaryLayout;

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);
  Router.events.on('routeChangeError', progress.finish);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {});
    return () => {
      router.events.off('routeChangeComplete', () => {});
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Hydrate state={pageProps.dehydratedState}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </Hydrate>
            </ThemeProvider>
          </StyledEngineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
