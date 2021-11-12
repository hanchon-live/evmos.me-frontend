import { Container, Flex, VStack } from '@chakra-ui/layout';
import { useProps } from '@chakra-ui/system';

import Sidebar from '../sidebar/sidebar';

const Template = (props: any) => {
    return (
        <>
            <Container maxW="full" p={0}>
                <Flex h="100vh">
                    <Sidebar active={props.active}></Sidebar>
                    <VStack
                        w="full"
                        h="full"
                        overflowY="scroll"
                        spacing={0}
                        alignItems="center"
                    >
                        {props.element}
                    </VStack>
                </Flex>
            </Container>
        </>
    );
};

export default Template;
