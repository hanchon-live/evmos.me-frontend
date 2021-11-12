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
import ERC20Item from '../tokens/erc20item';
import EvmosHeader from '../header/evmosheader';

const ERC20Assets = () => {
    return (
        <Box h="auto">
            <Box w="full" p={5}>
                <Heading size="lg" color="white" textAlign="left">
                    ERC20 tokens:
                </Heading>
                <Text py={2}>All the registered ERC20 tokens on Evmos.me</Text>
            </Box>
            <SimpleGrid
                mt={2}
                columns={[1, 1, 2, 3, 4]}
                columnGap={[0, 0, 3, 3, 3]}
                rowGap={6}
                h="full"
            >
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
            </SimpleGrid>
        </Box>
    );
};

export default ERC20Assets;
