import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { AiOutlineSend, AiOutlineTransaction } from 'react-icons/ai';
import {
    MdOutlineGeneratingTokens,
    MdOutlineSendAndArchive,
    MdOutlineSendToMobile,
    MdScheduleSend,
} from 'react-icons/md';
import { GiAbstract022 } from 'react-icons/gi';
import { TiArrowMoveOutline } from 'react-icons/ti';
import { FaFileContract, FaReact } from 'react-icons/fa';
import MsgSend from '../messages/msgsend';
import MyIcon from '../messages/messagesIcon';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import MessagesIcon from '../messages/messagesIcon';
import DelegateAphotons from '../messages/delegate';
import UndelegateAphotons from '../messages/undelegate';
import DeployERC20Card from '../messages/deployerc20';
import Strong from '../template/strong';
import TitleH2 from '../template/heading2';
import MintERC20 from '../messages/mintERC20';
import TransferToken from '../tools/tokentransfer';
import { GrNewWindow } from 'react-icons/gr';
import { BsFilePlus } from 'react-icons/bs';

function ERC20Subtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'ERC20'} />
                    {' helper.'}
                    <br />
                    {'Deploy an ERC20 contract using '}
                    <Strong
                        content={'Open Zeppelin - ERC20PresetMinterPauser'}
                    />
                    {'.'}
                </>
            }
        />
    );
}

export function TransactionsIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'teal.200'}>
            <MdOutlineGeneratingTokens fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function DeployERC20Grid() {
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
                Deployment
            </chakra.h1>

            <SimpleGrid columns={[1, 2]} spacing={'20'} mt={16} mx={'auto'}>
                <GeneralCards
                    key={'deploy erc20'}
                    name={'ERC20PresetMinterPauser'}
                    role={`Submit the ERC20 contract.`}
                    content={[<DeployERC20Card key="deployerc20content" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgsendicon"
                            icon={<FaFileContract size={'25'} />}
                        />,
                    ]}
                />

                <GeneralCards
                    key={'minterc20'}
                    name={'Mint Coins'}
                    role={'Mint coins on your ERC20 contract.'}
                    content={[<MintERC20 key="minterc20cotent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgmint"
                            icon={<BsFilePlus size={'25'} />}
                        />,
                    ]}
                />
                <GeneralCards
                    key={'transfererc20'}
                    name={'Transfer ERC20'}
                    role={'Transfer your tokens to another wallet.'}
                    content={[<TransferToken key="transfertokencontent" />]}
                    iconComponents={[
                        <MessagesIcon
                            key="msgtt"
                            icon={<TiArrowMoveOutline size={'25'} />}
                        />,
                    ]}
                />
            </SimpleGrid>
        </VStack>
    );
}

export const DeployErc20Section = () => {
    return (
        <General
            title="Deploy ERC20 Tokens on EVMOS"
            subtitle={[<ERC20Subtitle key="deploysub" />]}
            content={[<DeployERC20Grid key="deploygrid" />]}
            icon={[<TransactionsIconFooter key="deployfooter" />]}
        ></General>
    );
};
