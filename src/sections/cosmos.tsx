import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import {
    VStack,
    Heading,
    Text,
    SimpleGrid,
    GridItem,
    Box,
    Badge,
    Center,
    Grid,
} from '@chakra-ui/layout';
import CosmosItem from '../tokens/cosmositem';

const Aphoton = () => {
    return (
        <>
            <Box w="full" h="full" p={2} borderRadius="75px" bgColor="teal.700">
                <Center>
                    <Heading textShadow="5px 5px #234E52" color="white">
                        Evmos Coins:
                    </Heading>
                </Center>
                <Center>
                    <Text textShadow="3px 3px #234E52">
                        All the registered Evmos coins on Evmos.me
                    </Text>
                </Center>
            </Box>
            <SimpleGrid
                columns={[1, 1, 2, 3, 4]}
                columnGap={[0, 0, 3, 3, 3]}
                rowGap={6}
                w="full"
            >
                <CosmosItem />
                <CosmosItem />
                <CosmosItem />
                <CosmosItem />
                <CosmosItem />
                <CosmosItem />
                <CosmosItem />
            </SimpleGrid>
        </>
    );
};

export default Aphoton;
