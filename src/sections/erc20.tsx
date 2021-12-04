import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { FaEthereum, FaReact } from 'react-icons/fa';
import TextSpan from '../theme/textSpan';
import { store, Balance, BalanceERC20Item } from '../utils/state';
import General, { GeneralCards } from './general';
import { GlobalState } from '../utils/state';
import Strong from '../template/strong';
import TitleH2 from '../template/heading2';

function ERC20Subtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'ERC20'} />
                    {' balances.'}
                    <br />
                    {'(All your ERC20 tokens registered on Evmos.me)'}
                </>
            }
        />
    );
}

function ERC20IconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <FaEthereum fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function ERC20Grid({ globalState }: { globalState: GlobalState }) {
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
            {globalState.state.balanceERC20.map(
                (coin: BalanceERC20Item, index: number) => {
                    return (
                        <GeneralCards
                            key={index}
                            name={coin.name}
                            role={`Current ${coin.name} balance - ${coin.address}`}
                            content={[
                                <TextSpan
                                    content={`${coin.balance} ${coin.symbol}`}
                                    key={`${coin.symbol}key`}
                                />,
                            ]}
                            avatar={useColorModeValue(
                                './ethereum-1.svg',
                                './ethereum-1-white.svg'
                            )}
                        />
                    );
                }
            )}
        </SimpleGrid>
    );
}

export const Erc20Section = () => {
    const globalState = useContext(store);
    return (
        <General
            title="Your ERC20 tokens"
            subtitle={[<ERC20Subtitle key="sub" />]}
            content={[<ERC20Grid key="grid" globalState={globalState} />]}
            icon={[<ERC20IconFooter key="footer" />]}
        ></General>
    );
};
