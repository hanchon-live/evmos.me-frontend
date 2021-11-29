import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Center, HStack, Link } from '@chakra-ui/layout';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box
            textAlign="right"
            bg={useColorModeValue('white', 'gray.900')}
            w="100%"
            h="100%"
            // minH="4vh"
            // p={0}
            py={3}
            px={2}
            borderTop="1px"
            borderTopColor={useColorModeValue('gray.200', 'gray.700')}
            // bg={useColorModeValue('gray.100', 'gray.900')}
            id="footerbox"
        >
            <HStack justifyContent="flex-end">
                <span>#HackAtom2021 - Evmos.me - Hanchon </span>
                <Link href="https://github.com/hanchon-live/evmos.me-frontend">
                    <FaGithub
                        size="30px"
                        color={useColorModeValue('black', 'white')}
                    />
                </Link>
            </HStack>
        </Box>
    );
};

export default Footer;
