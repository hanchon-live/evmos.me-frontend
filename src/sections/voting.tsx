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
import { FaReact } from 'react-icons/fa';
import MsgSend from '../messages/msgsend';
import MyIcon from '../messages/messagesIcon';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import MessagesIcon from '../messages/messagesIcon';
import DelegateAphotons from '../messages/delegate';
import UndelegateAphotons from '../messages/undelegate';
import TitleH2 from '../template/heading2';
import Strong from '../template/strong';
import { RiSecurePaymentLine } from 'react-icons/ri';
import IBCTransfer from '../messages/ibcTransfer';
import Voting from '../messages/voting';

function TransactionsSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'Governance'} />
                    {'  transactions.'}
                    <br />
                    {'Vote on any '}
                    <Strong content={'proposal'} />
                    {'.'}
                </>
            }
        />
    );
}

export function TransactionsIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <RiSecurePaymentLine fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function SendGrid() {
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
                Governance
            </chakra.h1>

            <SimpleGrid
                columns={{ base: 1 }}
                spacing={'20'}
                mt={16}
                mx={'auto'}
            >
                <GeneralCards
                    key={'send photons'}
                    name={'Voting'}
                    role={`Vote on proposals`}
                    content={[<Voting key="msgsendcontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon"
                            icon={<AiOutlineSend size={'25'} />}
                        />,
                    ]}
                />
            </SimpleGrid>
        </VStack>
    );
}

export const TransactionsVotingSection = () => {
    return (
        <General
            title="Governance Transactions"
            subtitle={[<TransactionsSubtitle key="sendsub" />]}
            content={[<SendGrid key="sendgrid" />]}
            icon={[<TransactionsIconFooter key="sendfooter" />]}
        ></General>
    );
};
