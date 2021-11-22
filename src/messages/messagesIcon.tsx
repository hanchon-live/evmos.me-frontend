import Icon from '@chakra-ui/icon';

interface props {
    icon: JSX.Element;
}
export default function MessagesIcon({ icon }: props) {
    return (
        // <BsFillWalletFill fill={'currentColor'} size="xl" />
        <Icon
            height={'60px'}
            width={'60px'}
            alignSelf={'center'}
            m={{ base: '0 0 35px 0', md: '0 0 0 20px' }}
            color={'teal.300'}
        >
            {icon}
        </Icon>
    );
}
