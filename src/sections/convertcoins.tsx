import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { AiOutlineSend, AiOutlineTransaction } from 'react-icons/ai';
import {
    MdOutlineSendAndArchive,
    MdOutlineSendToMobile,
    MdScheduleSend,
} from 'react-icons/md';
import { FaEthereum, FaReact } from 'react-icons/fa';
import MsgSend from '../messages/msgsend';
import MyIcon from '../messages/messagesIcon';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import MessagesIcon from '../messages/messagesIcon';
import DelegateAphotons from '../messages/delegate';
import UndelegateAphotons from '../messages/undelegate';
import TitleH2 from '../template/heading2';
import Strong from '../template/strong';
import RegisterERC20 from '../messages/registerERC20';
import ConvertERC20 from '../messages/converterc20';
import ConvertCoin from '../messages/convertcosmoscoin';
import { RiReactjsLine } from 'react-icons/ri';
import { SiConvertio } from 'react-icons/si';

function ConvertCoinsSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    {'Convert '}
                    <Strong content={'cosmos coins'} />
                    {' and '}
                    <Strong content={'ERC20'} />
                    {' tokens.'}
                    <br />
                    {'Intrarelayer functions'}
                    {'.'}
                </>
            }
        />
    );
}

export function ProposalsIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <SiConvertio fill={'currentColor'} size="35px" />
        </Icon>
    );
}

function ProposalGrid() {
    const globalState = useContext(store);
    return (
        <VStack w="full">
            <chakra.h1
                py={5}
                fontSize={35}
                fontFamily={'Work Sans'}
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.50')}
            >
                Convert
            </chakra.h1>

            <SimpleGrid columns={[1, 2]} spacing={'20'} mt={16} mx={'auto'}>
                <GeneralCards
                    key={'converterc20'}
                    name={'Convert ERC20'}
                    role={`Convert erc20 tokens to cosmos coins.`}
                    content={[<ConvertERC20 key="msgsendcontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon"
                            icon={<FaEthereum size={'24'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'convertcoins'}
                    name={'Convert Coins'}
                    role={`Convert ibc coins to erc20 tokens.`}
                    content={[<ConvertCoin key="msgconvertcoinscontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon2"
                            icon={<RiReactjsLine size={'25'} />}
                        />,
                    ]}
                />
            </SimpleGrid>
        </VStack>
    );
}

export const ConvertCoinsSections = () => {
    return (
        <General
            title="Cosmos Transactions"
            subtitle={[<ConvertCoinsSubtitle key="convertcoinssub" />]}
            content={[<ProposalGrid key="convertcoinsgrid" />]}
            icon={[<ProposalsIconFooter key="convertcoinsfooter" />]}
        ></General>
    );
};
