import { Container, Flex, VStack } from '@chakra-ui/layout';

import Sidebar from '../sidebar/sidebar';
import SidebarWithHeader from './sidebar';
interface TemplateProps {
    element: JSX.Element[];
    section: string;
}

const Template = ({ element, section }: TemplateProps) => {
    return (
        <Container maxW="full" p={0}>
            <SidebarWithHeader
                key="sidebar"
                children={element}
                section={section}
            />
        </Container>
    );
};

export default Template;
