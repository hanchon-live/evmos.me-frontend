import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { fromHexString, signatureToPubkey } from '@hanchon/signature-to-pubkey';
import { getPublicKey } from './backend';
import {
    setMetamask,
    setPubKey,
    setWalletEth,
    setWalletEvmos,
    unsetProvider,
    unsetPubKey,
    unsetWalletEth,
    unsetWalletEvmos,
} from './db';

export async function connectMetamask() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        await handleAccountsChanged(accounts);
    } catch (e) {
        console.log('could not connect');
    }
}

export function disconnectMetamask() {
    unsetWalletEth();
    unsetWalletEvmos();
    unsetPubKey();
    unsetProvider();
}

export async function signRandomMessage(wallet: string) {
    const randomMsg =
        '0000000000000000000000000000000000000000000000000000000000000000';
    await window.ethereum.enable('0x2328');
    let signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [wallet, `0x${randomMsg}`],
    });
    return signatureToPubkey(signature, Buffer.from(fromHexString(randomMsg)));
}

export async function handleAccountsChanged(accounts: Array<string>) {
    setMetamask();
    if (accounts.length === 0) {
        disconnectMetamask();
        return;
    }
    setWalletEth(accounts[0]);
    setWalletEvmos(ethToEvmos(accounts[0]));
    let pubkey = await getPublicKey(accounts[0]);
    if (pubkey === '') {
        pubkey = signRandomMessage(accounts[0]);
    }
    setPubKey(pubkey);
}

// window.ethereum.on('accountsChanged', handleAccountsChanged);
