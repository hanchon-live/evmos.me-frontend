import { ethToEvmos, evmosToEth } from '@hanchon/ethermint-address-converter';
import { fromHexString, signatureToPubkey } from '@hanchon/signature-to-pubkey';
import { fireSuccess } from '../landing/alert';
import { generatePublicKey, getPublicKey } from './backend';
import { getAllBalances } from './blockchain/balances';
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
import { disconnectWallet, queryBalances } from './wallet';

declare global {
    interface Window {
        getOfflineSignerOnlyAmino: any;
        keplr: any;
        getOfflineSigner: any;
        ethereum: any;
    }
}

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
        console.error('could not connect' + e);
    }
}
export async function signRandomMessage(wallet: string) {
    let signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [wallet, 'generate_pubkey'],
    });
    let message = Buffer.from([
        50, 215, 18, 245, 169, 63, 252, 16, 225, 169, 71, 95, 254, 165, 146,
        216, 40, 162, 115, 78, 147, 125, 80, 182, 25, 69, 136, 250, 65, 200, 94,
        178,
    ]);

    // let hashWihPrefix = "66687AADF862BD776" + "C8FC18B8E9F8E20089" + "714856EE233B3902A5" + "91D0D5F2925"
    return signatureToPubkey(signature, message);
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
            await queryBalances(state);
            return;
        }
    }

    let pubkey = await generatePublicKey(accounts[0]);
    if (pubkey === '') {
        pubkey = await signRandomMessage(accounts[0]);
    }
    state.dispatch({ type: 'pubkey', payload: { pubkey } });
    setPubKey(pubkey);
    await queryBalances(state);

    fireSuccess('Logged in with Metamask', 'You can now start using evmos.me!');
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
