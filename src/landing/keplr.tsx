import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { fireError, fireSuccess } from './alert';

const config = {
    RPC_URL: 'http://localhost:26657',
    REST_URL: 'http://127.0.0.1:1317/',
    EXPLORER_URL: 'https://evm.evmos.org/',
    NETWORK_NAME: 'Evmos',
    NETWORK_TYPE: 'testnet',
    CHAIN_ID: 'evmos_9000-1',
    CHAIN_NAME: 'Evmos Testnet',
    COIN_DENOM: 'PHOTON',
    COIN_MINIMAL_DENOM: 'aphoton',
    COIN_DECIMALS: 18,
    PREFIX: 'evmos',
    COIN_TYPE: 118,
    GAS_PRICE_STEP_LOW: 0.005,
    GAS_PRICE_STEP_AVERAGE: 0.025,
    GAS_PRICE_STEP_HIGH: 0.04,
};

const REST_URL = config.REST_URL;
const RPC_URL = config.RPC_URL;

const chainId = config.CHAIN_ID;
const chainName = config.CHAIN_NAME;
const coinDenom = config.COIN_DENOM;
const coinMinimalDenom = config.COIN_MINIMAL_DENOM;
const coinDecimals = config.COIN_DECIMALS;
const prefix = config.PREFIX;

const chainConfig = {
    chainId: chainId,
    chainName,
    rpc: RPC_URL,
    rest: REST_URL,
    stakeCurrency: {
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
    },
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: `${prefix}`,
        bech32PrefixAccPub: `${prefix}pub`,
        bech32PrefixValAddr: `${prefix}valoper`,
        bech32PrefixValPub: `${prefix}valoperpub`,
        bech32PrefixConsAddr: `${prefix}valcons`,
        bech32PrefixConsPub: `${prefix}valconspub`,
    },
    currencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
        },
    ],
    feeCurrencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
        },
    ],
    coinType: config.COIN_TYPE,
    gasPriceStep: {
        low: config.GAS_PRICE_STEP_LOW,
        average: config.GAS_PRICE_STEP_AVERAGE,
        high: config.GAS_PRICE_STEP_HIGH,
    },
};

declare global {
    interface Window {
        getOfflineSignerOnlyAmino: any;
        keplr: any;
        getOfflineSigner: any;
    }
}

async function initKeplr(isWaiting: CallableFunction) {
    isWaiting(true);

    if (!window.getOfflineSignerOnlyAmino || !window.keplr) {
        fireError('Error with Keplr', 'Please install keplr extension');
        isWaiting(false);
        return;
    } else {
        if (window.keplr.experimentalSuggestChain) {
            try {
                await window.keplr.experimentalSuggestChain(chainConfig);
            } catch (error) {
                fireError('Error with Keplr', 'Failed to suggest the chain');
                isWaiting(false);
            }
        } else {
            fireError(
                'Error with Keplr',
                'Please use the recent version of keplr extension'
            );
            isWaiting(false);
        }
    }

    if (window.keplr) {
        await window.keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner(chainId);
        // TODO: redirect
        fireSuccess(
            'Logged in with Keplr',
            'You can now start using evmos.me!'
        );
        isWaiting(false);
    } else {
        return null;
    }

    isWaiting(false);
}

const Keplr = () => {
    const [waiting, isWaiting] = useState(false);
    return (
        <div>
            <Button
                variant="primary"
                isLoading={waiting}
                onClick={() => initKeplr(isWaiting)}
            >
                Log in with Keplr
            </Button>
        </div>
    );
};

export default Keplr;
