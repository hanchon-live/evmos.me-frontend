import {
    Box,
    Center,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/layout';
import { BiKey, BiWallet } from 'react-icons/bi';
import { BsFillKeyFill } from 'react-icons/bs';

const AddressDetails = ({ wallet, walletEvmos, publicKey }: any) => {
    return (
        <VStack spacing={3} alignItems="center" mx={5} mt={3}>
            {/* <Heading size="md" mb={2}>Your current wallet</Heading> */}
            <SimpleGrid columns={[1, 1, 2, 3]} mt={[0, 0, 4, 4]}>
                <Box>
                    <Heading size="xs" textAlign={['center', 'center', 'left']}>
                        Hex(Ethereum)
                    </Heading>
                    <HStack>
                        <BiWallet size="30px" />
                        <Text
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'bold',
                            }}
                        >
                            {wallet}
                        </Text>
                    </HStack>
                </Box>

                <Box>
                    <Heading size="xs" textAlign={['center', 'center', 'left']}>
                        Bech32(Evmos)
                    </Heading>
                    <HStack>
                        <BiWallet size="30px" />
                        <Text
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'bold',
                            }}
                        >
                            {walletEvmos}
                        </Text>
                    </HStack>
                </Box>
                <Box>
                    <Heading size="xs" textAlign={['center', 'center', 'left']}>
                        PublicKey
                    </Heading>
                    <HStack>
                        <BsFillKeyFill size="30px" />
                        <Text
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'bold',
                            }}
                        >
                            {publicKey}
                        </Text>
                    </HStack>
                </Box>
            </SimpleGrid>
        </VStack>
    );
};

export default AddressDetails;
