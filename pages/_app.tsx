import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';
import Head from 'next/head';
import '../src/theme/styles.scss';
import { StateProvider, store } from '../src/utils/state';
import { useContext, useEffect } from 'react';
import { reconnectWallet, WalletInitializer } from '../src/utils/wallet';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <StateProvider>
                <Head>
                    <title>Evmos.me</title>
                </Head>
                <WalletInitializer />
                <Component {...pageProps} />
            </StateProvider>
        </ChakraProvider>
    );
};

export default App;
