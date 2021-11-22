import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { FaReact } from 'react-icons/fa';
import TextSpan from '../theme/textSpan';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';

function CosmosSubtitle() {
    return (
        <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
        >
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                Cosmos Coins
            </chakra.strong>
            {' balances.'}
            <br />
            {'('}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                Aphotons
            </chakra.strong>
            {', '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                IBC vouchers
            </chakra.strong>
            {', '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                intrarelayer coins
            </chakra.strong>
            {')'}
        </chakra.h2>
    );
}

function CosmosIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <FaReact fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function CosmosGrid() {
    const globalState = useContext(store);
    return (
        <SimpleGrid
            columns={{
                base: 1,
                xl: globalState.state.balanceCosmos.length > 2 ? 2 : 1,
            }}
            spacing={'20'}
            mt={16}
            mx={'auto'}
        >
            {globalState.state.balanceCosmos.map(
                (coin: Balance, index: number) => {
                    return (
                        <GeneralCards
                            key={index}
                            name={coin.denom}
                            role={`Current ${coin.denom} balance.`}
                            content={[
                                <TextSpan
                                    content={`${coin.amount} ${coin.denom}`}
                                />,
                            ]}
                            avatar={
                                coin.denom == 'aphoton'
                                    ? './evmos-black.svg'
                                    : './coins.png'
                            }
                        />
                    );
                }
            )}
        </SimpleGrid>
    );
}

export const CosmosSection = () => {
    return (
        <General
            title="Your Cosmos Coins"
            subtitle={[<CosmosSubtitle key="sub" />]}
            content={[<CosmosGrid key="grid" />]}
            icon={[<CosmosIconFooter key="footer" />]}
        ></General>
    );
};
