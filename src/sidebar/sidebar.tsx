import { Avatar } from '@chakra-ui/avatar';
import {
    Circle,
    Divider,
    Flex,
    Heading,
    Link,
    Square,
    Text,
} from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import { useContext, useEffect, useState } from 'react';
import { FiDatabase, FiHome, FiMenu } from 'react-icons/fi';
import { BiWallet } from 'react-icons/bi';
import { BsCashCoin } from 'react-icons/bs';
import { AiOutlineLogout, AiOutlineSend } from 'react-icons/ai';
import NavItem from './navitem';
import { requestWallet } from '../landing/metamask';
import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { unsetPubKey, unsetWallet } from '../utils/db';
import { fireSuccess } from '../landing/alert';
import { connectMetamask } from '../utils/metamask';
import { store } from '../utils/state';
import { disconnectWallet } from '../utils/wallet';
export default function Sidebar(props: any) {
    const globalState = useContext(store);
    // const [metamask, setMetamask] = useState(false);
    // useEffect(() => {
    //     async function fetchWallet() {
    //         let a = await connectMetamask();
    //         setMetamask(a != '');
    //     }
    //     fetchWallet();
    // }, []);
    // const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            boxShadow="xl"
            // background="teal.400"
            post="sticky"
            // left="5"
            // h="95vh"
            // marginTop="2.5vh"
            // boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            w="75px"
            // borderRadius="50px"
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex p="30%" flexDir="column" alignItems="center" as="nav">
                <Link href="/">
                    <Circle size="55px" m="4px" bg="teal.900" boxShadow="xl">
                        <Circle
                            size="50px"
                            bg="teal.200"
                            _hover={{
                                textDecor: 'none',
                                backgroundColor: 'teal.100',
                            }}
                        >
                            <Circle size="40px" bg="teal.900">
                                <Square size="30px">
                                    <Image src="logo.png" alt="logo"></Image>
                                </Square>
                            </Circle>
                        </Circle>
                    </Circle>
                </Link>
                <Divider mt={5} />

                <NavItem
                    title={'Wallet'}
                    icon={BiWallet}
                    description="Your wallet information"
                    link="/wallet"
                    active={props.active === 'wallet' ? true : false}
                />
                <Divider mt={5} />
                <NavItem
                    title={'Transactions'}
                    icon={AiOutlineSend}
                    description="Send cosmos transactions"
                    link="/txns"
                    active={props.active === 'transactions' ? true : false}
                />
                <Divider mt={5} />
                <NavItem
                    title={'Assets'}
                    icon={BsCashCoin}
                    description="Your assets details"
                    link="/assets"
                    active={props.active === 'assets' ? true : false}
                />
                <Divider mt={5} />
                <NavItem
                    title={'Logout'}
                    icon={AiOutlineLogout}
                    description="Logout from metamask"
                    onClick={() => {
                        disconnectWallet(globalState);
                        fireSuccess(
                            'Logout',
                            'Your credentials were removed from the app.'
                        );
                    }}
                    link="#"
                />
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems="center" mb={4}>
                <Divider display="none" />
                <Flex mt={4} align="center">
                    <Image
                        src={
                            globalState.state.provider === 'metamask'
                                ? './metamask-fox.svg'
                                : globalState.state.provider === 'keplr'
                                ? './keplr.png'
                                : './newlogo.png'
                        }
                        alt="metamask"
                        onClick={() => {
                            // alert('disconnect metamask');
                        }}
                    ></Image>
                </Flex>
            </Flex>
        </Flex>
    );
}
