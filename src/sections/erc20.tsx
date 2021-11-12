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

const ERC20 = () => {
    return (
        <>
            {/* <Box w="full"> */}
            <Box w="full" h="full" p={2} borderRadius="75px" bgColor="teal.700">
                <Center>
                    <Heading textShadow="5px 5px #234E52" color="white">
                        ERC20 tokens:
                    </Heading>
                </Center>
                <Center>
                    <Text textShadow="3px 3px #234E52">
                        All the registered ERC20 tokens on Evmos.me
                    </Text>
                </Center>
            </Box>
            <SimpleGrid
                mt={2}
                columns={[1, 1, 2, 3, 4]}
                columnGap={[0, 0, 3, 3, 3]}
                rowGap={6}
                w="full"
            >
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
                <ERC20Item />
            </SimpleGrid>
            {/* // </Box> */}
        </>
    );
};

export default ERC20;
