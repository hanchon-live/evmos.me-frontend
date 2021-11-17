import { Container, Flex, VStack } from '@chakra-ui/layout';

import Sidebar from '../sidebar/sidebar';
import SidebarWithHeader from './sidebar';

const Template = (props: any) => {
    return (
        <Container maxW="full" p={0}>
            <SidebarWithHeader children={props.element} />
        </Container>
    );
};

export default Template;
