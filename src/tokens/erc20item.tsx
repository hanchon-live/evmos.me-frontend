import { Button } from '@chakra-ui/button';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Badge, Box, Center, GridItem, HStack, Text } from '@chakra-ui/layout';
import { Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/tag';
import { FaEthereum } from 'react-icons/fa';
const ERC20Item = () => {
    return (
        <GridItem colSpan={1} w="full">
            <Center w="full">
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    w="full"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="lg"
                    bgGradient="linear(to-br, teal.400, teal.300)"
                >
                    <Box p="6" w="full">
                        <Box
                            ml="2"
                            w="full"
                            display="flex"
                            alignItems="baseline"
                        >
                            <Tag
                                size="md"
                                key="lg"
                                variant="subtle"
                                colorScheme="teal"
                            >
                                <TagLabel>ERC20</TagLabel>
                                <TagRightIcon boxSize="15px" as={FaEthereum} />
                            </Tag>
                        </Box>
                        <Box
                            color="gray.200"
                            fontWeight="bold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                            mt={1}
                        >
                            &bull; Token name &bull;{' '}
                            <Text ml="2" fontWeight="bold" color="white">
                                Photon
                            </Text>
                        </Box>
                        <Box
                            color="gray.200"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            mt="2"
                            ml="2"
                        >
                            &bull; Balance &bull;{' '}
                            <Text ml="2" fontWeight="bold" color="white">
                                10000 Aphoton
                            </Text>
                        </Box>
                        <Center p="0" alignItems="center" w="full">
                            <Button
                                colorScheme="teal"
                                variant="solid"
                                mt="5"
                                ml="2"
                            >
                                Transfer &bull; <ArrowRightIcon />
                            </Button>
                        </Center>
                    </Box>
                </Box>
            </Center>
        </GridItem>
    );
};

export default ERC20Item;
