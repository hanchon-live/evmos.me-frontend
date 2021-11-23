import { extendTheme, withDefaultVariant } from '@chakra-ui/react';
import foundations from './foundations';

const direction = 'ltr';

const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    cssVarPrefix: 'chakra',
};

export const theme = {
    direction,
    ...foundations,
    config,
    components: {
        Button: {
            variants: {
                primary: {
                    _hover: {
                        bg: 'teal.600',
                    },
                },
            },
        },
    },
};

export default extendTheme(
    theme,
    withDefaultVariant({
        variant: 'primary',
        components: ['Button'],
    })
);
