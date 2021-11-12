import { Box, Heading, Text, VStack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { getPubKey, getWalletEth, getWalletEvmos } from '../utils/db';
import AddressDetails from './addressDetails';
import WalletButtons from './walletButtons';

const EvmosHeader = () => {
    const [wallet, setDisplayWallet] = useState('0x...');
    const [walletEvmos, setDisplayWalletEvmos] = useState('evmos1...');
    const [publicKey, setDisplayPublicKey] = useState('At/...');

    const updateWallets = () => {
        let eth = getWalletEth();
        if (eth !== null) {
            setDisplayWallet(eth);
        }
        let evmos = getWalletEvmos();
        if (evmos !== null) {
            setDisplayWalletEvmos(evmos);
        }

        let pubkey = getPubKey();
        if (pubkey !== null) {
            setDisplayPublicKey(pubkey);
        }
    };
    useEffect(() => {
        updateWallets();
    }, []);

    return (
        <Box py={12} w="full" boxShadow="lg" bgColor="teal.600">
            <VStack spacing={3} alignItems="center">
                <Heading size="3xl" color="white">
                    Evmos.me
                </Heading>
                <Text color="white">Your all in one evmos wallet</Text>
                <WalletButtons updater={updateWallets} />
            </VStack>
            <AddressDetails
                wallet={wallet}
                walletEvmos={walletEvmos}
                publicKey={publicKey}
            />
        </Box>
    );
};
export default EvmosHeader;
