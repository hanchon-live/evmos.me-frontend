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

            <VStack textAlign="left" alignItems="left" pt={10} px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            Notes:
                        </Heading>
                    }
                />
                <Text pt={3}>
                    Changing the fees and gas limit may result on your
                    transaction running out of gas, the current values are not
                    optimal but they work. If you have better gas/fees
                    calculations feel free to reach out.
                </Text>
                <Text>
                    This project was developed as part of the HackAtom2021, it
                    can be improved and refined for mainnet usage but with the
                    current state is meant to be only used on testnet.
                </Text>
                <Text>
                    Any transaction sent to the network can not be reverted, use
                    the app as your own risk.
                </Text>
                <Text>
                    All the code is open source and can be found on{' '}
                    <Link href="github.com/hanchon-live/evmos.me-frontend">
                        Frontend Github
                    </Link>{' '}
                    and{' '}
                    <Link href="github.com/hanchon-live/evmos.me-backend">
                        Backend Github
                    </Link>
                </Text>
            </VStack>

            <VStack textAlign="left" alignItems="left" pt={10} px={10}>
                <TitleH2
                    content={
                        <Heading key="q1" textAlign="center">
                            TODOs:
                        </Heading>
                    }
                />
                <Text pt={3}>
                    List all the intrarelayer coins without the need to remember
                    the complete assigned name. Display the correct value for
                    the intrarelayer coins because the GRPC response list the
                    balances, for example, as PHOTON, but it should be displayed
                    as BALANCE/DECIMALS PHOTONS.
                </Text>
                <Text>
                    List all the current active proposals and allow the user to
                    vote using his wallet.
                </Text>
                <Text>
                    List all the validator and simplify the delegate photons
                    process.
                </Text>
                <Text>
                    Read the ERC20 registered tokens from the gov proposals
                    instead of manually adding the contract addresses.
                </Text>
                <Text>
                    Add a display cosmos message info option for each message
                    before signing it with Metamask. (This information is
                    already displayed on Keplr when sending the same
                    transaction)
                </Text>
            </VStack>
        </VStack>
    );
};

export default FAQSection;
