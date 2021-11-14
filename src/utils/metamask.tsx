import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { fromHexString, signatureToPubkey } from '@hanchon/signature-to-pubkey';
import { getPublicKey } from './backend';
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

export async function connectMetamask() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        await handleAccountsChanged(accounts);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
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
    let signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [wallet, `0x${randomMsg}`],
    });
    return signatureToPubkey(signature, Buffer.from(fromHexString(randomMsg)));
}

export async function handleAccountsChanged(accounts: Array<string>) {
    // console.log("called")
    // console.log(accounts)

    // const accounts = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    // });

    let account = getWalletEth();
    let pubkeyDb = getPubKey();

    disconnectMetamask();
    setMetamask();
    if (accounts.length === 0) {
        disconnectMetamask();
        location.reload();
        return;
    }
    setWalletEth(accounts[0]);
    setWalletEvmos(ethToEvmos(accounts[0]));
    if (account != getWalletEth()) {
        location.reload();
    } else {
        if (pubkeyDb === null) {
            let pubkey = await getPublicKey(accounts[0]);
            if (pubkey === '') {
                pubkey = await signRandomMessage(accounts[0]);
            }
            setPubKey(pubkey);
        }
    }
}

export async function signCosmosTransaction(wallet: string, converted: string) {
    let signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [wallet, '0x' + converted],
    });
    let signBytes = fromHexString(signature.split('0x')[1]);
    return Buffer.from(signBytes).toString('base64');
}
