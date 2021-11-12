import { Button } from '@chakra-ui/button';
import { Box, Center, SimpleGrid } from '@chakra-ui/layout';
import { connectMetamask } from '../utils/metamask';

const WalletButtons = ({ updater }: any) => {
    return (
        <Center m={1}>
            <SimpleGrid columns={[1, 1, 2]} mt={[0, 2, 4]}>
                <Box mr={[0, 0, 5]} mb={[3, 3, 0]}>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            await connectMetamask();
                            updater();
                        }}
                    >
                        Connect with Metamask
                    </Button>
                </Box>
                <Button
                    variant="primary"
                    onClick={async () => {
                        await connectMetamask();
                        updater();
                        // updateWallets();
                    }}
                >
                    Connect with Keplr
                </Button>
            </SimpleGrid>
        </Center>
    );
};

export default WalletButtons;
