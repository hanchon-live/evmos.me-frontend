import { chakra } from '@chakra-ui/system';
import { useColorModeValue } from '@chakra-ui/color-mode';

interface TitleH2Props {
    content: JSX.Element;
}
const TitleH2 = ({ content }: TitleH2Props) => {
    return (
        <chakra.h2
            margin={'auto'}
            width={'75%'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={useColorModeValue('gray.500', 'gray.400')}
            letterSpacing="wide"
        >
            {content}
        </chakra.h2>
    );
};
export default TitleH2;
