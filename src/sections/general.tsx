import { Box, Flex, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useContext } from 'react';
import { GlobalState, store } from '../utils/state';
import Icon from '@chakra-ui/icon';

interface GeneralData {
    title: string;
    subtitle: JSX.Element;
    content: JSX.Element;
    icon: JSX.Element;
}
export default function General({
    title,
    subtitle,
    content,
    icon,
}: GeneralData) {
    const globalState: GlobalState = useContext(store);

    return (
        <Flex
            textAlign={'center'}
            pt={3}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
        >
            <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                <chakra.h1
                    py={5}
                    fontSize={48}
                    fontFamily={'Work Sans'}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.700', 'gray.50')}
                >
                    Your Wallet Details
                </chakra.h1>
                <chakra.h2
                    margin={'auto'}
                    width={'70%'}
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    color={useColorModeValue('gray.500', 'gray.400')}
                >
                    {'Basic wallet information with your '}
                    <chakra.strong
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        addresses
                    </chakra.strong>
                    {', '}
                    <chakra.strong
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        public key
                    </chakra.strong>
                    {' used for signing and '}
                    <chakra.strong
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        balance
                    </chakra.strong>
                    {'.'}
                </chakra.h2>
            </Box>
            {content}
            {/* <SimpleGrid
                columns={{ base: 1, xl: 2 }}
                spacing={'20'}
                mt={16}
                mx={'auto'}>
                {data.map((cardInfo, index) => (
                    <WalletCard key={index} {...cardInfo} index={index} />
                ))}
            </SimpleGrid> */}
            <Box>{icon}</Box>
        </Flex>
    );
}
