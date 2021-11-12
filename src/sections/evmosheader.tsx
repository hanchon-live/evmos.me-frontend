import { Box, Heading, Text, VStack } from '@chakra-ui/layout';

const EvmosHeader = () => {
    return (
        <Box py={12} w="full" boxShadow="lg" bgColor="teal.600">
            <VStack spacing={3} alignItems="center">
                <Heading size="3xl" color="white">
                    Evmos.me
                </Heading>
                <Text color="white">Your all in one evmos wallet</Text>
            </VStack>
        </Box>
    );
};
export default EvmosHeader;
