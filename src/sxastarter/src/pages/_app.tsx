import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';
// Redux and store-related imports
import { Provider } from 'react-redux';

import store from 'src/store';
import { fetchNopStoreConfig } from 'src/services/NopStoreConfigService';
import { setConfig } from 'src/store/NopStoreConfig';
import { SitecorePageProps } from 'lib/page-props';
// Component imports
import ThemeProvider from 'components/ThemeContext/ThemeProvider';

// Global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import 'src/assets/css/styles.scss';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const preloadConfig = async () => {
  const config = await fetchNopStoreConfig();
  if (config) {
    store.dispatch(setConfig(config)); // Dispatch to Redux store
  }
};

preloadConfig();

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <Provider store={store}>
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <ThemeProvider>
          <Component {...rest} />
        </ThemeProvider>
      </I18nProvider>
    </Provider>
  );
}

export default App;
