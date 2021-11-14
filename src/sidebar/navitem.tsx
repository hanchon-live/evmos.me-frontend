import { Center, Flex, Link, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/icon';
import {
    Circle,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import NavHoverBox from './navhoverbox';
import { template } from 'lodash';

const NavItem = ({ icon, title, active, description, link, onClick }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            // alightItems="center"
        >
            <Menu id={title} placement="right" isOpen={isOpen}>
                <Link w="100%" textAlign="center" href={link} onClick={onClick}>
                    <Center>
                        <Circle
                            boxShadow="base"
                            size="50px"
                            _hover={{
                                textDecor: 'none',
                                backgroundColor: 'teal.100',
                            }}
                            backgroundColor={
                                (active && 'teal.100') || 'teal.600'
                            }
                            // backgroundColor={}
                        >
                            <Circle
                                size="40px"
                                backgroundColor={
                                    (active && 'teal.300') || 'teal.300'
                                }
                            >
                                <MenuButton
                                    onMouseEnter={onOpen}
                                    onMouseLeave={onClose}
                                >
                                    <Flex w="100%">
                                        <Icon
                                            as={icon}
                                            fontSize="2xl"
                                            color={active ? 'white' : 'black'}
                                        />
                                    </Flex>
                                </MenuButton>
                            </Circle>
                        </Circle>
                    </Center>
                </Link>
                <MenuList
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    py={0}
                    px={0}
                    boder="none"
                    w={200}
                    h={200}
                    ml={5}
                    backgroundColor="transparent"
                    borderColor="transparent"
                >
                    <NavHoverBox
                        title={title}
                        icon={icon}
                        description={description}
                    />
                </MenuList>
            </Menu>
        </Flex>
    );
};
export default NavItem;
