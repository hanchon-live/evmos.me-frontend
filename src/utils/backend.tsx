import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { REACT_APP_BACKEND_URL } from './contants';
import {
    getPubKey,
    getWalletEth,
    getWalletEvmos,
    isKeplr,
    isMetamask,
} from './db';
import { signCosmosTransaction } from './metamask';

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

export function signTransaction(data: string) {
    let wallet = getWalletEth();
    if (wallet === null) {
        return null;
    }
    if (isMetamask()) {
        return signCosmosTransaction(wallet, data);
    }
}

// console.log(signDoc)
// console.log(converted)
// try {

//     // let signature = await window.ethereum.request({
//     //     method: 'eth_sign',
//     //     params: [wallet, "0x" + converted],
//     // })
//     // console.log(signature)

//     // let signBytes = fromHexString(signature.split("0x")[1])
//     // // console.log(signBytes)
//     // // var ret = { }
//     // // ret.r = signBytes.slice(0, 32)
//     // // ret.s = signBytes.slice(32, 64)
//     // // let buffer = Buffer.from(signBytes.slice(64, 65));
//     // // ret.v = signBytes.slice(64, 65)
//     // // console.log(ret)
//     // // let recovered = ecrecover(Buffer.from(signDoc), Buffer.from(ret.v), Buffer.from(ret.r), Buffer.from(ret.s))
//     // // console.log(recovered)
//     // // console.log(btoa(String.fromCharCode.apply(null, recovered)))

//     // // console.log(signBytes)
//     // let signb64 = btoa(String.fromCharCode.apply(null, signBytes))
//     console.log({
//         signature: signb64,
//         authBytes: res.authInfoBytes,
//         bodyBytes: res.bodyBytes,
//     })
//     console.log(signb64)
//     let body = JSON.stringify({
//         signature: signb64,
//         authBytes: res.authInfoBytes,
//         bodyBytes: res.bodyBytes,
//     })
//     console.log(body)

//     const response2 = await fetch("http://127.0.0.1:8000/broadcast/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // pubkey:addressList[0].pubkey
//         body: body,
//     });

//     let resp = await response2.json()
//     console.log(resp)

//     // let x = await res2.json()
//     // console.log(x)
//     // console.log("asd")
