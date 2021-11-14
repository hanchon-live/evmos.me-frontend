import { Heading, Text, SimpleGrid, Box } from '@chakra-ui/layout';
import { FaReact } from 'react-icons/fa';
import Token from './token';

const CosmosCoins = () => {
    return (
        <Box h="auto">
            <Box w="full" p={5}>
                <Heading size="lg" color="white" textAlign="left">
                    Cosmos Coins:
                </Heading>
                <Text py={2}>All the registered Cosmos Coins on Evmos.me</Text>
            </Box>
            <SimpleGrid
                mt={2}
                columns={[1, 1, 2, 3, 4]}
                columnGap={[0, 0, 3, 3, 3]}
                rowGap={6}
                h="full"
            >
                <Token
                    Icon={FaReact}
                    name="Photon"
                    balance="10000"
                    address="0X752E67BD2E22C3D327415D9DBC5F671214573642"
                />
            </SimpleGrid>
        </Box>
    );
};

export default CosmosCoins;
