import { Button } from '@chakra-ui/button';
import { Center, Divider, Heading, Text, VStack } from '@chakra-ui/layout';
import Keplr from './keplr';
import Metamask from './metamask';

const Logo = () => {
    return (
        // alignItems="flex-start"
        <VStack w="full" h="full" spacing={1} justify="center">
            <Center>
                <Heading fontSize="6xl">Evmos.me</Heading>
            </Center>
            <Center>
                <Text fontSize="xl">Your all in one EVMOS wallet</Text>
            </Center>
            <Center py={10}>
                {/* <Keplr></Keplr> */}
                <Metamask></Metamask>
            </Center>
        </VStack>
    );
};
export default Logo;
