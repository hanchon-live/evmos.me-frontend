import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { BsFillWalletFill } from 'react-icons/bs';
import TextSpan from '../theme/textSpan';
import { store } from '../utils/state';
import General, { GeneralCards } from './general';

function WalletSubtitle() {
    return (
        <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
        >
            {'Basic wallet information with your '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                addresses
            </chakra.strong>
            {', '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                public key
            </chakra.strong>
            {' used for signing and '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                balance
            </chakra.strong>
            {'.'}
        </chakra.h2>
    );
}

function WalletIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <BsFillWalletFill fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function WalletGrid() {
    const globalState = useContext(store);

    const data = [
        {
            name: 'Evmos',
            role: '(Bech32) Evmos encoded wallet',
            content: [<TextSpan content={globalState.state.walletEvmos} />],
            avatar: './evmos-black.svg',
        },
        {
            name: 'Hex',
            role: '(0x) Ethereum encoded wallet',
            content: [<TextSpan content={globalState.state.walletEth} />],
            avatar: './ethereum-1.svg',
        },
        {
            name: 'Public Key',
            role: '(Base64) Value used for signing the transactions',
            content: [<TextSpan content={globalState.state.pubkey} />],
            avatar: './selfkey.svg',
        },
        {
            name: 'Balance',
            role: '(Aphotons) Current evmos coin balance',
            content: [
                <TextSpan content={`${globalState.state.aphoton} Aphotons`} />,
            ],
            avatar: './coins.png',
        },
    ];
    return (
        <SimpleGrid
            columns={{ base: 1, xl: 2 }}
            spacing={'20'}
            mt={16}
            mx={'auto'}
        >
            {data.map((cardInfo, index) => (
                <GeneralCards key={index} {...cardInfo} />
            ))}
        </SimpleGrid>
    );
}

export const Wallet = () => {
    return (
        <General
            icon={[<WalletIconFooter />]}
            title="Your Wallet Details"
            subtitle={[<WalletSubtitle />]}
            content={[<WalletGrid />]}
        ></General>
    );
};
