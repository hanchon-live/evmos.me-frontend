import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { AiOutlineSend, AiOutlineTransaction } from 'react-icons/ai';
import { MdOutlineSendAndArchive, MdScheduleSend } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import MsgSend from '../messages/msgsend';
import MyIcon from '../messages/messagesIcon';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import MessagesIcon from '../messages/messagesIcon';
import DelegateAphotons from '../messages/delegate';
import UndelegateAphotons from '../messages/undelegate';
import { TransactionsIconFooter } from './send';

function TransactionsSubtitle() {
    return (
        <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
        >
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                Validator
            </chakra.strong>
            {' transactions.'}
            <br />
            {''}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                Delegate
            </chakra.strong>
            {' and '}
            <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                undelegate
            </chakra.strong>
            {' your coins.'}
        </chakra.h2>
    );
}

function ValidatorGrid() {
    return (
        <VStack w="full" key="vstack">
            <chakra.h1
                py={5}
                fontSize={35}
                fontFamily={'Work Sans'}
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.50')}
            >
                Validator
            </chakra.h1>

            <SimpleGrid
                columns={[1, 1, 1, 1, 2]}
                spacing={'20'}
                mt={16}
                mx={'auto'}
            >
                <GeneralCards
                    key={'delegate'}
                    name={'Delegate'}
                    role="Delegate your aphotons to a validator"
                    content={[<DelegateAphotons key="delegatecontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="delegateicon"
                            icon={<MdScheduleSend key="icon" size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'undelegate'}
                    name={'Undelegate'}
                    role="Undelegate your aphotons."
                    content={[<UndelegateAphotons key="undelegatecontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="undelegateicon"
                            icon={
                                <MdOutlineSendAndArchive
                                    key="icon"
                                    size={'25'}
                                />
                            }
                        />,
                    ]}
                />
            </SimpleGrid>
        </VStack>
    );
}

export const TransactionsValidatorSection = () => {
    return (
        <General
            title="Cosmos Transactions"
            subtitle={[<TransactionsSubtitle key="sub" />]}
            content={[<ValidatorGrid key="grid" />]}
            icon={[<TransactionsIconFooter key="footer" />]}
        ></General>
    );
};
