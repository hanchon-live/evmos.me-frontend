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
import RegisterERC20 from '../messages/registerERC20';
import ConvertCoinProposal from '../messages/convertcosmoscoin';
import RegisterCoin from '../messages/registercoin';
import ToggleToken from '../messages/toggletoken';
import UpdateTokenPair from '../messages/update_toker_pair';

function ProposalsSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'Register'} />
                    {' and '}
                    <Strong content={'Read'} />
                    <br />
                    {'Intrarealyer proposals'}
                    {'.'}
                </>
            }
        />
    );
}

export function ProposalsIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <MdOutlineSendToMobile fill={'currentColor'} size="40px" />
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
                Register
            </chakra.h1>

            <SimpleGrid
                columns={{ base: 1 }}
                spacing={'20'}
                mt={16}
                mx={'auto'}
            >
                <GeneralCards
                    key={'send photons'}
                    name={'Register ERC20'}
                    role={`Create a proposal to register your erc20.`}
                    content={[<RegisterERC20 key="msgsendcontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon"
                            icon={<AiOutlineSend size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'send photons'}
                    name={'Register Coins'}
                    role={`Create a proposal to register your cosmos coin.`}
                    content={[<RegisterCoin key="rcproposal" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon2"
                            icon={<AiOutlineSend size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'tt'}
                    name={'Toggle Tokens'}
                    role={`Create a proposal to toggle an intrarelaayer token.`}
                    content={[<ToggleToken key="ttproposal" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon3"
                            icon={<AiOutlineSend size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'up'}
                    name={'Update Pairs'}
                    role={`Create a proposal to update an erc20 contract address.`}
                    content={[<UpdateTokenPair key="upproposal" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon4"
                            icon={<AiOutlineSend size={'25'} />}
                        />,
                    ]}
                />
            </SimpleGrid>
        </VStack>
    );
}

export const ProposalsSections = () => {
    return (
        <General
            title="Cosmos Transactions"
            subtitle={[<ProposalsSubtitle key="proposalssub" />]}
            content={[<ProposalGrid key="proposalsgrid" />]}
            icon={[<ProposalsIconFooter key="proposalsfooter" />]}
        ></General>
    );
};
