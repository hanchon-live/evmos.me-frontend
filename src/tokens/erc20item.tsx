import { Button } from '@chakra-ui/button';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Center,
    Circle,
    Grid,
    GridItem,
    HStack,
    Text,
} from '@chakra-ui/layout';
import { Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/tag';
import { FaEthereum } from 'react-icons/fa';
const ERC20Item = () => {
    return (
        <GridItem colSpan={1}>
            <Center>
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="lg"
                    m={3}
                    bgGradient="linear(to-br, teal.500, teal.600)"
                >
                    <Grid
                        templateRows="repeat(4, 5em)"
                        templateColumns="repeat(2)"
                    >
                        <GridItem rowSpan={1} colSpan={1}>
                            <Center h="full" pt={10}>
                                <Circle
                                    bg="teal.900"
                                    h="75px"
                                    w="75px"
                                    boxShadow="base"
                                >
                                    <Circle bg="teal.700" h="60px" w="60px">
                                        <FaEthereum size="50px" />
                                    </Circle>
                                </Circle>
                            </Center>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={1} justifyItems="center">
                            <Center h="full" pt={10}>
                                <Box
                                    color="gray.200"
                                    fontWeight="bold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    &bull; Token name &bull;
                                    <Text
                                        fontWeight="bold"
                                        fontSize="lg"
                                        color="white"
                                    >
                                        Photon
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={2} justifyItems="center">
                            <Center h="full">
                                <Box
                                    color="gray.200"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    &bull; Balance &bull;
                                    <Text
                                        fontWeight="bold"
                                        fontSize="lg"
                                        color="white"
                                    >
                                        10000 Aphoton
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={2} justifyItems="center">
                            <Center h="auto">
                                <Box
                                    color="gray.200"
                                    fontWeight="bold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    textAlign="center"
                                    px={3}
                                >
                                    &bull; Address &bull;
                                    <Text
                                        fontWeight="bold"
                                        fontSize="md"
                                        color="white"
                                        style={{ overflowWrap: 'anywhere' }}
                                    >
                                        0x752e67bd2e22c3d327415d9dbc5f671214573642
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={2} justifyItems="center">
                            <Center alignItems="center" h="full">
                                <Button
                                    colorScheme="teal"
                                    variant="solid"
                                    _hover={{
                                        border: '1px',
                                        backgroundColor: 'teal.400',
                                    }}
                                >
                                    Transfer &bull; <ArrowRightIcon />
                                </Button>
                            </Center>
                        </GridItem>
                    </Grid>
                </Box>
            </Center>
        </GridItem>
    );
};

export default ERC20Item;
