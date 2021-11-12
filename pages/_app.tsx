import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';
import Head from 'next/head';
import '../src/theme/styles.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>Evmos.me</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default App;
