import { Container, Flex, VStack } from '@chakra-ui/layout';
import Logo from '../src/landing/logo';
import Details from '../src/sections/details';

const IndexPage = () => (
    <Container maxW="full" p={0}>
        <Flex h="100vh">
            <Logo></Logo>
            {/* <Details></Details> */}
            {/* <VStack w="full" h="full" p={10} spacing={10} bg="gray.50" alignItems="flex-start">
                <h2>evmos.me</h2>
            </VStack> */}
        </Flex>
    </Container>
);
export default IndexPage;
