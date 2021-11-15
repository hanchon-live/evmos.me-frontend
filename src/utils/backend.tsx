import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { REACT_APP_BACKEND_URL } from './contants';
import {
    getPubKey,
    getWalletEth,
    getWalletEvmos,
    isKeplr,
    isMetamask,
} from './db';
import { signCosmosTransactionKeplr } from './keplr';
import { signCosmosTransaction } from './metamask';

export async function getAllBalances(address: string) {
    if (address === null) {
        return { balances: [] };
    }
    if (address.split('0x').length == 2) {
        address = ethToEvmos(address);
    }
    const pubresp = await fetch(`${REACT_APP_BACKEND_URL}/get_all_balances/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: address }),
    });
    let resp = await pubresp.json();
    console.log(resp);
    return resp;
}

export async function getPublicKey(address: string) {
    if (address.split('0x').length == 2) {
        address = ethToEvmos(address);
    }
    const pubresp = await fetch(`${REACT_APP_BACKEND_URL}/get_pubkey/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: address }),
    });
    let resp = await pubresp.json();
    return resp.value;
}

export async function callSendAphoton(dest: string, amount: string) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/send_aphotons/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wallet: {
                address: getWalletEvmos(),
                algo: algo,
                pubkey: getPubKey(),
            },
            destination: dest,
            amount: amount,
        }),
    });
    let res = await response.json();
    var signDoc = new Uint8Array(
        atob(res.signBytes)
            .split('')
            .map(function (c) {
                return c.charCodeAt(0);
            })
    );
    res.converted = Buffer.from(signDoc).toString('hex');
    return res;
}

export async function delegateAphoton(dest: string, amount: string) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/delegate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wallet: {
                address: getWalletEvmos(),
                algo: algo,
                pubkey: getPubKey(),
            },
            destination: dest,
            amount: amount,
        }),
    });
    let res = await response.json();
    var signDoc = new Uint8Array(
        atob(res.signBytes)
            .split('')
            .map(function (c) {
                return c.charCodeAt(0);
            })
    );
    res.converted = Buffer.from(signDoc).toString('hex');
    return res;
}

export async function broadcast(
    authInfo: string,
    bodyBytes: string,
    signature: string
) {
    let body = JSON.stringify({
        signature: signature,
        authBytes: authInfo,
        bodyBytes: bodyBytes,
    });

    const response = await fetch(`${REACT_APP_BACKEND_URL}/broadcast/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });

    let resp = await response.json();
    return resp;
}

export function signTransaction(data: any) {
    if (isMetamask()) {
        let wallet = getWalletEth();
        if (wallet === null) {
            return null;
        }
        return signCosmosTransaction(wallet, data);
    }

    if (isKeplr()) {
        let wallet = getWalletEvmos();
        if (wallet === null) {
            return null;
        }
        return signCosmosTransactionKeplr(wallet, data);
    }
}
