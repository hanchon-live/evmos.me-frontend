import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Flex, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsFillWalletFill } from 'react-icons/bs';
import MessagesIcon from '../messages/messagesIcon';
import TitleH2 from '../template/heading2';
import Strong from '../template/strong';
import TextSpan from '../theme/textSpan';
import ConvertAddress from '../tools/convertaddress';
import QueryERC20Balance from '../tools/queryerc20balance';
import { store } from '../utils/state';
import General, { GeneralCards } from './general';

function WalletUtilsSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    {'Basic wallet information with your '}
                    <Strong content={'addresses'} />
                    {', '}
                    <Strong content={'public key'} />
                    {' used for signing and '}
                    <Strong content={'balance'} />
                    {'.'}
                </>
            }
        />
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

    return (
        <SimpleGrid
            columns={{ base: 1, xl: 1 }}
            spacing={'20'}
            mt={16}
            mx={'auto'}
        >
            <GeneralCards
                key={'convert address'}
                name={'Convert address'}
                role={`Converter between 0x and bech32(evmos1) addresses.`}
                content={[<ConvertAddress key="convertAddress" />]}
                iconComponents={[
                    <MessagesIcon
                        key="msgsendicon"
                        icon={<AiOutlineSend size={'25'} />}
                    />,
                ]}
            />
            {/* <GeneralCards
                key={'geterc20balance'}
                name={'Query ERC20 balance'}
                role={`Query the token owned by a given address.`}
                content={[<QueryERC20Balance key="queryerc20" />]}
                iconComponents={[
                    <MessagesIcon
                        key="msgsendicon"
                        icon={<AiOutlineSend size={'25'} />}
                    />,
                ]}
            /> */}
        </SimpleGrid>
    );
}

export const WalletUtilsSection = () => {
    return (
        <General
            icon={[<WalletIconFooter key="walletfooter" />]}
            title="Wallet Utils"
            subtitle={[<WalletUtilsSubtitle key="walletsub" />]}
            content={[<WalletGrid key="walletgrid" />]}
        ></General>
    );
};
