import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { VStack, Heading, Text, SimpleGrid, GridItem } from '@chakra-ui/layout';

const Details = () => {
    return (
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">evmos.me</Heading>
                <Text>Your all in one evmos wallet.</Text>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="hanchon"></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="paoletti"></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input placeholder="paoletti"></Input>
                    </FormControl>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default Details;
