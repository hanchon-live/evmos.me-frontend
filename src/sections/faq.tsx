import {
    Divider,
    Heading,
    VStack,
    Spacer,
    Text,
    Flex,
    Link,
} from '@chakra-ui/layout';
import TitleH2 from '../template/heading2';

const FAQSection = () => {
    return (
        <VStack w="fit-content">
            <Heading mt={10}>Frequently Asked Questions</Heading>
            <VStack textAlign="left" alignItems="left" px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            Why does it ask me to sign a 0x00000... message when
                            login with Metamask?
                        </Heading>
                    }
                />
                <Text pt={3}>
                    To send cosmos transactions using Metamask the wallet needs
                    the public key information.
                </Text>
                <Text>
                    If your account has never sent a transaction in the Evmos
                    network, requesting the public key to the evmos network will
                    return an empty response.
                </Text>
                <Text>
                    In order to allow the user to send transactions in this
                    case, evmos.me will request the user to sign an empty
                    transaction and extract the public key using that signature.
                </Text>
            </VStack>

            <VStack textAlign="left" alignItems="left" pt={10} px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            Why can not I create and send ERC20 using the Keplr
                            wallet?
                        </Heading>
                    }
                />
                <Text pt={3}>
                    Evmos supports two kinds of transactions: cosmos and
                    ethereum. The cosmos transactions can be signed using
                    eth_secp256k1 (metamask) and secp256k1 (keplr), but the
                    ethereum transactions can only be signed by eth_secp256k1.
                </Text>
                <Text>
                    The tharsis team is working on supporting secp256k1 / add
                    eth_sec256k1 to Keplr in order to allow to sign ethereum
                    transaction, but at the moment is impossible to interact
                    with eth contracts using Keplr.
                </Text>
            </VStack>

            <VStack textAlign="left" alignItems="left" pt={10} px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            Why is there a warning message when sending
                            transactions on Metamask?
                        </Heading>
                    }
                />
                <Text pt={3}>
                    To sign and send cosmos transactions with Metamask, evmos.me
                    can not send the complete cosmos information to Metamask
                    because the wallet doesn't support cosmos. The only way to
                    send cosmos transactions is directly is to sign the hashed
                    message.
                </Text>
                <Text>
                    I'm working on displaying detailed information on each of
                    these messages to show the user how the hash was generated,
                    so it can be reviewed before signing the message.
                </Text>
            </VStack>

            <VStack textAlign="left" alignItems="left" pt={10} px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            Why is my ERC20 token not showing in the ERC20 page?
                        </Heading>
                    }
                />
                <Text pt={3}>
                    The ERC20 page will only display by default the hardcoded
                    contracts on the backend, more contracts can be added at any
                    time. If you want your contract to be listed, just message
                    me{' '}
                    <Link href="https://twitter.com/gepaoletti">
                        [@gepaoletti]
                    </Link>{' '}
                    on twitter or{' '}
                    <Link href="https://github.com/hanchon">[hanchon]</Link> on
                    github.
                </Text>
                <Text>
                    I have plans to move the listed tokens to governance
                    proposals but that will be for the next version.
                </Text>
                <Text>
                    The balance of any ERC20 wallet can be manually queried
                    using the Utils/Wallet section.
                </Text>
            </VStack>
        </VStack>
    );
};

export default FAQSection;
