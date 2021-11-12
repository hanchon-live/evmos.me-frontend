import { Button } from '@chakra-ui/button';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Link } from '@chakra-ui/layout';
import { useState } from 'react';
import { BiArrowToRight } from 'react-icons/bi';
import { BsArrowRight, BsArrowRightCircle } from 'react-icons/bs';
import { getPubKey, getWallet, setPubKey, setWallet } from '../utils/db';
import { fireError, fireSuccess } from './alert';

declare global {
    interface Window {
        getOfflineSignerOnlyAmino: any;
        keplr: any;
        getOfflineSigner: any;
        ethereum: any;
    }
}

export async function requestPubKey() {
    if (window.ethereum) {
        let addr = getWallet();
        if (addr === null) {
            addr = await requestWallet();
        }
        let pubkey = getPubKey();
        if (pubkey === null) {
            let res = await window.ethereum.request({
                method: 'eth_getEncryptionPublicKey',
                params: [addr],
            });
            setPubKey(res);
            return res;
        }
        return pubkey;
    }
    return null;
}

export async function requestWallet() {
    if (window.ethereum) {
        let res = await window.ethereum.request({ method: 'eth_accounts' });
        setWallet(res[0]);
        return res[0];
    }
    return '';
}

async function initMetamask(isWaiting: CallableFunction) {
    isWaiting(true);

    if (!window.ethereum) {
        fireError(
            'Error with Metamas',
            'Please install the metamask extension'
        );
        isWaiting(false);
        return;
    }
    // else {
    //     if (window.keplr.experimentalSuggestChain) {
    //         try {
    //             await window.keplr.experimentalSuggestChain(chainConfig);
    //         } catch (error) {
    //             fireError('Error with Keplr', 'Failed to suggest the chain');
    //             isWaiting(false)
    //         }
    //     } else {
    //         fireError('Error with Keplr', 'Please use the recent version of keplr extension');
    //         isWaiting(false)
    //     }
    // }

    if (window.ethereum) {
        await window.ethereum.enable('0x2328');
        // const offlineSigner = window.getOfflineSigner("0x2328");
        // TODO: redirect
        fireSuccess(
            'Logged in with Metamask',
            'You can now start using evmos.me!'
        );
        isWaiting(false);
    } else {
        return null;
    }

    isWaiting(false);
}

const Metamask = () => {
    const [waiting, isWaiting] = useState(false);
    return (
        <div>
            {/* onClick={() => initMetamask(isWaiting)} */}
            <Link href="/wallet" _hover={{ textDecor: 'none' }}>
                <Button variant="primary" isLoading={waiting}>
                    Go to dashboard
                    <Box ml="2">
                        <BsArrowRightCircle />
                    </Box>
                </Button>
            </Link>
        </div>
    );
};

export default Metamask;
