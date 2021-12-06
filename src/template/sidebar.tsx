import React, { ReactElement, ReactNode, useContext } from 'react';
import {
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Img,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';

import { SiJfrogbintray, SiInternetarchive, SiConvertio } from 'react-icons/si';
import { VscTools } from 'react-icons/vsc';

import { GrSecure, GrValidate } from 'react-icons/gr';

import { RiSecurePaymentLine } from 'react-icons/ri';

import { Center, Divider, Heading, Spacer } from '@chakra-ui/layout';

import { Image } from '@chakra-ui/image';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { BiLogOut, BiUpArrow, BiWallet } from 'react-icons/bi';
import { FaEthereum, FaFirefox, FaReact } from 'react-icons/fa';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { AiFillAppstore, AiOutlineTransaction } from 'react-icons/ai';
import { connectMetamask } from '../utils/metamask';
import { GlobalState, store } from '../utils/state';
import { connectKeplr } from '../utils/keplr';
import { disconnectWallet } from '../utils/wallet';
import { fireSuccess } from '../landing/alert';
import {
    MdDarkMode,
    MdLightMode,
    MdOutlineGeneratingTokens,
    MdOutlineSendToMobile,
} from 'react-icons/md';

import { useColorMode } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/button';
import { BsWallet2 } from 'react-icons/bs';
import Footer from './footer';
import TextSpan from '../theme/textSpan';

interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}

export default function SidebarWithHeader({
    children,
    section,
}: {
    children: ReactNode;
    section: string;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            minH="100vh"
            bg={useColorModeValue('gray.100', 'gray.900')}
            id="sidebarmainbox"
            overflowY="hidden"
        >
            <SidebarContent
                currentSection={section}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        onClose={onClose}
                        currentSection={section}
                    />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav id="mobilenav" onOpen={onOpen} />
            <VStack h="full">
                <Box ml={{ base: 0, md: 60 }} p="4" minH="85vh">
                    {children}
                </Box>
                <Footer />
            </VStack>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    currentSection: string;
}

const SidebarContent = ({ onClose, currentSection, ...rest }: SidebarProps) => {
    const globalState: GlobalState = useContext(store);

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <HStack>
                    <Box boxSize="35px">
                        <Image
                            bg="transparent"
                            src={useColorModeValue(
                                './renzo-rhino.png',
                                './renzo-rhino-white.png'
                            )}
                        />
                    </Box>
                    <Box h="full">
                        <Divider orientation="vertical" />
                    </Box>

                    <Text
                        fontSize="2xl"
                        fontFamily="var(--chakra-fonts-heading)"
                        fontWeight="bold"
                    >
                        Evmos.me
                    </Text>
                </HStack>
                <CloseButton
                    id="closebutton"
                    key="closebutton"
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            <Flex h="90vh" direction="column">
                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>
                <NavItem
                    id={'wallet'}
                    key={'Wallet'}
                    icon={BiWallet}
                    link={'/wallet'}
                    currentselected={currentSection}
                >
                    {'Wallet'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <NavTitle
                    id={'assets'}
                    key={'Assets'}
                    icon={AiFillAppstore}
                    link={'#'}
                    currentselected={currentSection}
                >
                    {'Assets'}
                </NavTitle>

                <NavItem
                    id={'cosmos'}
                    ml={10}
                    key={'Cosmos'}
                    icon={FaReact}
                    link={'/cosmos'}
                    currentselected={currentSection}
                >
                    {'Cosmos'}
                </NavItem>

                <NavItem
                    id={'erc20'}
                    ml={10}
                    key={'ERC20'}
                    icon={FaEthereum}
                    link={'/erc20'}
                    currentselected={currentSection}
                >
                    {'ERC20'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <NavTitle
                    id={'transactions'}
                    key={'Transactions'}
                    icon={MdOutlineSendToMobile}
                    link={'#'}
                >
                    {'Transactions'}
                </NavTitle>

                <NavItem
                    id={'send'}
                    ml={10}
                    key={'Send'}
                    icon={AiOutlineTransaction}
                    link={'/send'}
                    currentselected={currentSection}
                >
                    {'Send'}
                </NavItem>

                <NavItem
                    id={'erc20'}
                    ml={10}
                    key={'erc20'}
                    icon={MdOutlineGeneratingTokens}
                    link={'/deployerc20'}
                    currentselected={currentSection}
                >
                    <HStack>
                        <span>ERC20</span>
                        <Img
                            w="25px"
                            key="metamaskimg"
                            src="./metamask-fox.svg"
                        />
                    </HStack>
                </NavItem>

                <NavItem
                    id={'validator'}
                    ml={10}
                    key={'Validator'}
                    icon={RiSecurePaymentLine}
                    link={'/validator'}
                    currentselected={currentSection}
                >
                    {'Validator'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <NavTitle
                    id={'irm'}
                    key={'IntraRelayer'}
                    icon={SiJfrogbintray}
                    link={'#'}
                >
                    {'IntraRelayer'}
                </NavTitle>

                <NavItem
                    id={'convert'}
                    ml={10}
                    key={'Convert'}
                    icon={SiConvertio}
                    link={'/convertcoins'}
                    currentselected={currentSection}
                >
                    {'Convert'}
                </NavItem>

                <NavItem
                    id={'proposals'}
                    ml={10}
                    key={'Proposals'}
                    icon={SiInternetarchive}
                    link={'/proposals'}
                    currentselected={currentSection}
                >
                    {'Proposals'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <NavTitle id={'utils'} key={'Utils'} icon={VscTools} link={'#'}>
                    {'Utils'}
                </NavTitle>

                <NavItem
                    id={'walletutil'}
                    ml={10}
                    key={'WalletUtil'}
                    icon={BsWallet2}
                    link={'/walletutil'}
                    currentselected={currentSection}
                >
                    {'Wallet'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <NavItem
                    id={'faq'}
                    key={'FAQ'}
                    icon={BsWallet2}
                    link={'/faq'}
                    currentselected={currentSection}
                >
                    {'FAQ'}
                </NavItem>

                <HStack mx={5} my={2}>
                    <Divider />
                </HStack>

                <Spacer />
                <NavItem
                    onClick={() => {
                        disconnectWallet(globalState);
                        fireSuccess(
                            'Logout',
                            'Your credentials were removed from the app.'
                        );
                    }}
                    key="Logout"
                    icon={BiLogOut}
                    link="#"
                    currentselected={currentSection}
                >
                    Logout
                </NavItem>
            </Flex>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText | ReactElement;
    currentselected?: string;
    link?: string;
}

export const NavTitle = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            {...rest}
        >
            {icon && <Icon mr="4" fontSize="16" as={icon} />}
            {children}
        </Flex>
    );
};

const NavItem = ({
    icon,
    link,
    children,
    currentselected,
    ...rest
}: NavItemProps) => {
    const globalState = useContext(store);
    return (
        <Link
            href={link !== '#' ? link : undefined}
            style={{ textDecoration: 'none' }}
            _focus={{ border: '0px' }}
        >
            <Flex
                align="center"
                px="4"
                py="2"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color={
                    '/' + currentselected == link
                        ? 'white'
                        : useColorModeValue('black', 'white')
                }
                bg={'/' + currentselected == link ? 'teal.500' : 'transparent'}
                _hover={{
                    bg: 'teal.300',
                    color: useColorModeValue('white', 'black'),
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: useColorModeValue('white', 'black'),
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const globalState: GlobalState = useContext(store);
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            id="mobilenav"
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <Icon
                id="mobilenavicon"
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                id="mobilenavtext"
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="var(--chakra-fonts-heading)"
                fontWeight="bold"
            >
                Evmos.me
            </Text>

            <HStack spacing={{ base: '0', md: '6' }} id="hstacksidebar">
                <Flex alignItems={'center'} id="flexsidebar">
                    <Menu id="menusidebar" key="menukey" isLazy>
                        <Button
                            id="togglebutton"
                            key="buttontoggle"
                            mr={[2, 5, 10]}
                            onClick={toggleColorMode}
                        >
                            {colorMode === 'light' ? (
                                <MdDarkMode />
                            ) : (
                                <MdLightMode />
                            )}
                        </Button>
                        <MenuButton
                            id="sidebarbutton"
                            key="keysidebarbutton"
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack id="hstackinternal">
                                <Box boxSize="35px" id="boxinternal">
                                    <Image
                                        bg="transparent"
                                        src={
                                            globalState.state.provider ==
                                            'metamask'
                                                ? './metamask-fox.svg'
                                                : globalState.state.provider ==
                                                  'keplr'
                                                ? './keplr.svg'
                                                : useColorModeValue(
                                                      './renzo-rhino.png',
                                                      './renzo-rhino-white.png'
                                                  )
                                        }
                                    />
                                </Box>
                                <VStack
                                    id="navbarvstack"
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">
                                        {globalState.state.provider ==
                                        'metamask'
                                            ? 'Metamask'
                                            : globalState.state.provider ==
                                              'keplr'
                                            ? 'Keplr'
                                            : 'Disconnected'}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {globalState.state.provider == ''
                                            ? 'Connect your wallet'
                                            : 'Connected'}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            id="menulistsidebar"
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem id="itemwallet">
                                <Link
                                    id="itemwalletlink"
                                    _hover={{ textDecor: 'none' }}
                                    href="/wallet"
                                >
                                    <HStack>
                                        <BiWallet />
                                        <Text>Wallet Info</Text>
                                    </HStack>
                                </Link>
                            </MenuItem>
                            <MenuItem id="mitemmetamask">
                                <HStack
                                    id="mitemmetamaskhstack"
                                    onClick={async () => {
                                        await connectMetamask(globalState);
                                    }}
                                >
                                    <ArrowUpIcon />
                                    <Text>Connect with Metamask</Text>
                                </HStack>
                            </MenuItem>
                            <MenuItem id="mitemmetakeplr">
                                <HStack
                                    id="mitemmetakeplrhstack"
                                    onClick={async () => {
                                        await connectKeplr(globalState);
                                    }}
                                >
                                    <ArrowUpIcon />
                                    <Text>Connect with Keplr</Text>
                                </HStack>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem id="mitemlogout">
                                <HStack
                                    id="mitemlogouthstack"
                                    onClick={() => {
                                        disconnectWallet(globalState);
                                        fireSuccess(
                                            'Logout',
                                            'Your credentials were removed from the app.'
                                        );
                                    }}
                                >
                                    <BiLogOut />
                                    <Text>Disconnect</Text>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
