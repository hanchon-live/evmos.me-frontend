import Icon from '@chakra-ui/icon';
import { Flex, Heading, Text } from '@chakra-ui/layout';

const NavHoverBox = ({ icon, title, description }: any) => {
    return (
        <Flex>
            <Flex
                post="absolute"
                mt="calc(100px - 7.5px)"
                ml="-10px"
                w={0}
                h={0}
                borderTop="10px solid transparent"
                borderBottom="10px solid transparent"
                borderRight="10px solid #38B2AC"
            ></Flex>

            <Flex
                h={200}
                // w={200}
                w="100%"
                flexDir="column"
                alignItems="center"
                justify="center"
                backgroundColor="teal.400"
                borderRadius="10px"
                borderColor="green"
                color="white"
                textAlign="center"
            >
                <Icon as={icon} fontSize="3xl" />
                <Heading size="md" fontWeight="normal">
                    {title}
                </Heading>
                <Text>{description}</Text>
            </Flex>
        </Flex>
    );
};

export default NavHoverBox;
