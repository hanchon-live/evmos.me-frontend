import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { BiWallet } from 'react-icons/bi';
import { BsFillKeyFill } from 'react-icons/bs';

const AddressDetails = ({ wallet, walletEvmos, publicKey }: any) => {
    return (
        <SimpleGrid columns={[1, 1, 2, 3]} mt={[2, 2, 4, 4]}>
            <Box
                bg="teal.800"
                p={3}
                borderRadius="15px"
                borderColor="teal.300"
                border="2px"
                m={2}
            >
                <Heading
                    size="xs"
                    style={{ fontWeight: 500 }}
                    textAlign="center"
                >
                    Hex(Ethereum)
                </Heading>
                <Center>
                    <BiWallet size="30px" />
                    <Text
                        ml={2}
                        style={{
                            overflowWrap: 'anywhere',
                            fontWeight: 'bold',
                        }}
                    >
                        {wallet}
                    </Text>
                </Center>
            </Box>

            <Box
                bg="teal.800"
                p={3}
                borderRadius="15px"
                borderColor="teal.300"
                border="2px"
                m={2}
            >
                <Heading
                    size="xs"
                    style={{ fontWeight: 500 }}
                    textAlign="center"
                >
                    Bech32(Evmos)
                </Heading>
                <Center>
                    <BiWallet size="30px" />
                    <Text
                        ml={2}
                        style={{
                            overflowWrap: 'anywhere',
                            fontWeight: 'bold',
                        }}
                    >
                        {walletEvmos}
                    </Text>
                </Center>
            </Box>
            <Box
                bg="teal.800"
                p={3}
                borderRadius="15px"
                borderColor="teal.300"
                border="2px"
                m={2}
            >
                <Heading
                    size="xs"
                    style={{ fontWeight: 500 }}
                    textAlign="center"
                >
                    PublicKey
                </Heading>
                <Center>
                    <BsFillKeyFill size="30px" />
                    <Text
                        ml={2}
                        style={{
                            overflowWrap: 'anywhere',
                            fontWeight: 'bold',
                        }}
                    >
                        {publicKey}
                    </Text>
                </Center>
            </Box>
        </SimpleGrid>
    );
};

export default AddressDetails;
