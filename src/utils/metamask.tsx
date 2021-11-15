import { ethToEvmos, evmosToEth } from '@hanchon/ethermint-address-converter';
import { fromHexString, signatureToPubkey } from '@hanchon/signature-to-pubkey';
import { getAllBalances, getPublicKey } from './backend';
import {
    getPubKey,
    getWalletEth,
    setMetamask,
    setPubKey,
    setWalletEth,
    setWalletEvmos,
    unsetProvider,
    unsetPubKey,
    unsetWalletEth,
    unsetWalletEvmos,
} from './db';
import { store } from './state';
import { disconnectWallet } from './wallet';

export async function connectMetamask(state: any) {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        await handleAccountsChanged(accounts, state);
        window.ethereum.on('accountsChanged', (e: Array<string>) =>
            handleAccountsChanged(e, state)
        );
    } catch (e) {
        console.log('could not connect' + e);
    }
}

export async function signRandomMessage(wallet: string) {
    const randomMsg =
        '0000000000000000000000000000000000000000000000000000000000000000';
    let signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [wallet, `0x${randomMsg}`],
    });
    return signatureToPubkey(signature, Buffer.from(fromHexString(randomMsg)));
}

export async function handleAccountsChanged(
    accounts: Array<string>,
    state: any
) {
    let account = getWalletEth();
    let pubkeyDb = getPubKey();

    disconnectWallet(state);
    setMetamask();
    state.dispatch({ type: 'provider', payload: { provider: 'metamask' } });
    if (accounts.length === 0) {
        disconnectWallet(state);
        location.reload();
        return;
    }

    state.dispatch({
        type: 'wallet',
        payload: {
            walletEth: accounts[0],
            walletEvmos: ethToEvmos(accounts[0]),
        },
    });
    setWalletEth(accounts[0]);
    setWalletEvmos(ethToEvmos(accounts[0]));
    if (account == getWalletEth()) {
        if (pubkeyDb !== null) {
            state.dispatch({ type: 'pubkey', payload: { pubkey: pubkeyDb } });
            setPubKey(pubkeyDb);
            return;
        }
    }

    let pubkey = await getPublicKey(accounts[0]);
    if (pubkey === '') {
        pubkey = await signRandomMessage(accounts[0]);
    }
    state.dispatch({ type: 'pubkey', payload: { pubkey } });
    setPubKey(pubkey);
}

export async function signCosmosTransaction(wallet: string, data: any) {
    let signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [wallet, '0x' + data.converted],
    });
    let signBytes = fromHexString(signature.split('0x')[1]);
    return {
        signature: Buffer.from(signBytes).toString('base64'),
        authBytes: data.authInfoBytes,
        bodyBytes: data.bodyBytes,
    };
}
