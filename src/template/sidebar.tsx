import React, { ReactNode, useContext } from 'react';
import {
    IconButton,
    Avatar,
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

import { Divider, Spacer } from '@chakra-ui/layout';

import { Image } from '@chakra-ui/image';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { BiLogOut, BiUpArrow, BiWallet } from 'react-icons/bi';
import { FaEthereum, FaFirefox, FaReact } from 'react-icons/fa';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { AiOutlineTransaction } from 'react-icons/ai';
import { connectMetamask } from '../utils/metamask';
import { GlobalState, store } from '../utils/state';
import { connectKeplr } from '../utils/keplr';
import { disconnectWallet } from '../utils/wallet';
import { fireSuccess } from '../landing/alert';

interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Wallet', icon: BiWallet, link: '/wallet' },
    { name: 'Cosmos', icon: FaReact, link: '/cosmos' },
    { name: 'ERC20', icon: FaEthereum, link: '/erc20' },
    { name: 'Transactions', icon: AiOutlineTransaction, link: '/transactions' },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
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
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const globalState: GlobalState = useContext(store);

    return (
        <Box
            transition="3s ease"
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
                        <Image bg="transparent" src={'./renzo-rhino.png'} />
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
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            <Flex h="90vh" direction="column">
                {LinkItems.map((link) =>
                    link.name !== 'Logout' ? (
                        <NavItem
                            key={link.name}
                            icon={link.icon}
                            link={link.link}
                        >
                            {link.name}
                        </NavItem>
                    ) : (
                        <></>
                    )
                )}
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
                >
                    Logout
                </NavItem>
            </Flex>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string;
}
const NavItem = ({ icon, link, children, ...rest }: NavItemProps) => {
    return (
        <Link
            href={link}
            style={{ textDecoration: 'none' }}
            _focus={{ border: '0px' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
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

    return (
        <Flex
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
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="var(--chakra-fonts-heading)"
                fontWeight="bold"
            >
                Evmos.me
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Box boxSize="35px">
                                    <Image
                                        bg="transparent"
                                        src={
                                            globalState.state.provider ==
                                            'metamask'
                                                ? './metamask-fox.svg'
                                                : globalState.state.provider ==
                                                  'keplr'
                                                ? './keplr.svg'
                                                : './renzo-rhino.png'
                                        }
                                    />
                                </Box>
                                <VStack
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
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem>
                                <Link
                                    _hover={{ textDecor: 'none' }}
                                    href="/wallet"
                                >
                                    <HStack>
                                        <BiWallet />
                                        <Text>Wallet Info</Text>
                                    </HStack>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <HStack
                                    onClick={async () => {
                                        await connectMetamask(globalState);
                                    }}
                                >
                                    <ArrowUpIcon />
                                    <Text>Connect with Metamask</Text>
                                </HStack>
                            </MenuItem>
                            <MenuItem>
                                <HStack
                                    onClick={async () => {
                                        await connectKeplr(globalState);
                                    }}
                                >
                                    <ArrowUpIcon />
                                    <Text>Connect with Keplr</Text>
                                </HStack>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                <HStack
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
