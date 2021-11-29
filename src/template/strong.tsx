import { chakra } from '@chakra-ui/system';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Strong = ({ content }: { content: string }) => {
    return (
        <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
            {content}
        </chakra.strong>
    );
};
export default Strong;
