import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, HStack, SimpleGrid } from '@chakra-ui/layout';
import { useContext } from 'react';
import { BiLogIn, BiLogOutCircle } from 'react-icons/bi';
import { connectKeplr } from '../utils/keplr';
import { connectMetamask } from '../utils/metamask';
import { store } from '../utils/state';

const WalletButtons = () => {
    const globalState = useContext(store);

    return (
        <Center m={1}>
            <SimpleGrid columns={[1, 1, 2]} mt={[0, 2, 4]}>
                <Box mr={[0, 0, 5]} mb={[3, 3, 0]}>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            await connectMetamask(globalState);
                        }}
                    >
                        <HStack>
                            {globalState.state.provider === 'metamask' ? (
                                <>
                                    <Flex> Connected with Metamask</Flex>
                                </>
                            ) : (
                                <>
                                    <BiLogIn />
                                    <Flex> Connect with Metamask</Flex>
                                </>
                            )}
                        </HStack>
                    </Button>
                </Box>
                {/* <Button
                    variant="primary"
                    onClick={async () => {
                        await connectKeplr(globalState);
                    }}
                >
                    <HStack>
                        {globalState.state.provider === 'keplr' ? (
                            <>
                                <Flex>Connected with Keplr</Flex>
                            </>
                        ) : (
                            <>
                                <BiLogIn />
                                <Flex>Connect with Keplr</Flex>
                            </>
                        )}
                    </HStack>
                </Button> */}
            </SimpleGrid>
        </Center>
    );
};

export default WalletButtons;
