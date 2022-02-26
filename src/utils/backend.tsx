import { ethToEvmos, evmosToEth } from '@hanchon/ethermint-address-converter';
import { GiConsoleController } from 'react-icons/gi';
import { fireError, fireSuccess } from '../landing/alert';
import { REACT_APP_BACKEND_URL } from './contants';
import { ethers } from 'ethers';

import {
    getPubKey,
    getWalletEth,
    getWalletEvmos,
    isKeplr,
    isMetamask,
} from './db';
import { signCosmosTransactionKeplr } from './keplr';
import { signCosmosTransaction } from './metamask';

// import {
//     createEIP712,
//     generateFee,
//     generateMessage,
//     generateTypes,
//     createMsgSend,
//     msgSendTypes,
// } from '@tharsis/evmosjs/packages/eip712';

// import {
//     createMsgSend as protoMsgSend,
//     createBody,
//     createFee,
//     createSignerInfo,
//     createAuthInfo,
//     createSigDoc,
//     createTransaction,
//     LEGACY_AMINO,
// } from '@tharsis/evmosjs/packages/proto';
import { Keccak } from 'sha3';

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
    return resp;
}

export async function getAllERC20Balances(address: string) {
    if (address === null) {
        return { balances: [] };
    }
    if (address.split('evmos1').length == 2) {
        address = evmosToEth(address);
    }
    const pubresp = await fetch(
        `${REACT_APP_BACKEND_URL}/get_all_erc20_balances/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: address }),
        }
    );
    let resp = await pubresp.json();
    console.log(resp);
    return resp;
}

export async function createERC20Contract(
    name: string,
    symbol: string,
    gas: string,
    gasPrice: string
) {
    const body = JSON.stringify({
        wallet: {
            address: getWalletEvmos(),
            algo: 'ethsecp256k1',
            pubkey: getPubKey(),
        },
        name: name,
        symbol: symbol,
        walletEth: getWalletEth(),
        gas: gas,
        gasPrice: gasPrice,
    });
    console.log(body);
    const pubresp = await fetch(
        `${REACT_APP_BACKEND_URL}/deploy_erc_20_contract/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }
    );
    let resp = await pubresp.json();
    return resp;
}

export async function createERC20Transfer(
    sender: string,
    destination: string,
    token: string,
    amount: string,
    gas: string,
    gasPrice: string
) {
    if (sender.split('evmos1').length == 2) {
        sender = evmosToEth(sender);
    }
    if (destination.split('evmos1').length == 2) {
        destination = evmosToEth(destination);
    }
    const pubresp = await fetch(
        `${REACT_APP_BACKEND_URL}/create_erc20_transfer/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender,
                destination,
                token,
                amount,
                gas,
                gasPrice,
            }),
        }
    );
    let resp = await pubresp.json();
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

// export async function callDeployERC20(name: string, symbol: string) {
//     let tx = await createERC20Contract(name, symbol);
//     if (isMetamask()) {
//         try {
//             let res = await window.ethereum.request({
//                 method: 'eth_sendTransaction',
//                 params: [tx.tx],
//             });
//             return fireSuccess(
//                 'DeployERC20',
//                 `Transaction sent with hash: ${res}`
//             );
//         } catch (e) {
//             console.error(e);
//             fireError(
//                 'DeployERC20',
//                 'Metamask error on submitting transaction'
//             );
//         }
//     } else {
//         fireError('DeployERC20', 'DeployERC20 is only available on metamask!');
//         return false;
//     }
// }

export async function callMintErc20(
    contract: string,
    destination: string,
    amount: string,
    gas: string,
    gasPrice: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/mint_erc20_coins`, {
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
            walletEth: getWalletEth(),
            contract: contract,
            destination: destination,
            amount: amount,
            gas: gas,
            gasPrice: gasPrice,
        }),
    });
    let res = await response.json();
    return res;
}

export async function callConvertCoin(
    denom: string,
    amount: string,
    receiver: string,
    sender: string,
    fee: string,
    gasLimit: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/convert_coin`, {
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
            denom: denom,
            amount: amount,
            receiver: receiver,
            sender: sender,
            fee: fee,
            gasLimit: gasLimit,
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

export async function callUpdateTokenPair(
    token: string,
    newToken: string,
    fee: string,
    gasLimit: string,
    proposalTitle: string,
    proposalDescription: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/update_token_pair`, {
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
            token: token,
            newToken: newToken,
            fee: fee,
            gasLimit: gasLimit,
            proposalTitle: proposalTitle,
            proposalDescription: proposalDescription,
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

export async function callToggleToken(
    token: string,
    fee: string,
    gasLimit: string,
    proposalTitle: string,
    proposalDescription: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/toggle_token`, {
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
            token: token,
            fee: fee,
            gasLimit: gasLimit,
            proposalTitle: proposalTitle,
            proposalDescription: proposalDescription,
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

export async function callConvertErc20(
    contract: string,
    amount: string,
    receiver: string,
    sender: string,
    fee: string,
    gasLimit: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/convert_erc20`, {
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
            contract: contract,
            amount: amount,
            receiver: receiver,
            sender: sender,
            fee: fee,
            gasLimit: gasLimit,
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

export async function callProposalRegisterCoin(
    description: string,
    base: string,
    display: string,
    name: string,
    symbol: string,
    dnName: string,
    dnExponent: string,
    dnAlias: string,
    dn2Name: string,
    dn2Exponent: string,

    fee: string,
    gasLimit: string,

    proposalTitle: string,
    proposalDescription: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(
        `${REACT_APP_BACKEND_URL}/proposal_register_coin`,
        {
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
                description: description,
                base: base,
                display: display,
                name: name,
                symbol: symbol,
                dnName: dnName,
                dnExponent: dnExponent,
                dnAlias: dnAlias,
                dn2Name: dn2Name,
                dn2Exponent: dn2Exponent,
                fee: fee,
                gasLimit: gasLimit,
                proposalTitle: proposalTitle,
                proposalDescription: proposalDescription,
            }),
        }
    );
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

export async function callProposalRegisterErc20(
    contract: string,
    fee: string,
    gasLimit: string,
    proposalTitle: string,
    proposalDescription: string
) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(
        `${REACT_APP_BACKEND_URL}/proposal_register_erc20`,
        {
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
                contract: contract,
                fee: fee,
                gasLimit: gasLimit,
                proposalTitle: proposalTitle,
                proposalDescription: proposalDescription,
            }),
        }
    );
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

export async function callGetERC20Balance(contract: string, wallet: string) {
    const response = await fetch(
        `${REACT_APP_BACKEND_URL}/get_erc20_balance/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contract,
                wallet,
            }),
        }
    );
    let res = await response.json();
    return res;
}
import {
    createMsgSend as protoMsgSend,
    createBody,
    createFee,
    createSignerInfo,
    createAuthInfo,
    createSigDoc,
    createTransaction,
    LEGACY_AMINO,
    createWeb3Extension,
    createTxRaw,
    createAnyMessage,
} from '@tharsis/proto';

import {
    createEIP712,
    generateFee,
    generateMessage,
    generateTypes,
    createMsgSend,
    msgSendTypes,
} from '@tharsis/eip712';

import { accountEndpoint, getAccount } from '@tharsis/provider';
export async function callSendAphoton(
    dest: string,
    amount: string,
    denom: string,
    memo: string
) {
    const sender = getWalletEvmos();
    if (sender == null) {
        return;
    }
    const pubkey = getPubKey();
    if (pubkey == null) {
        return;
    }
    console.log(sender);

    const get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: `{ "tx_bytes": [${txRaw.message.serializeBinary().toString()}], "mode": "BROADCAST_MODE_SYNC" }`
    };

    let addr = await fetch(
        `http://127.0.0.1:1317${accountEndpoint}/${sender}`,
        get
    );
    // If error 400 wallet doesn't exists
    let values = await addr.json();
    console.log(values);

    // await getAccount('https://localhost:1317', sender)

    // let acc = await fetch(`http://localhost:1317${accountEndpoint}/${sender}`)
    // console.log(acc)

    // Get account data
    const accountId = parseInt(values.account.base_account.account_number);
    const sequence = parseInt(values.account.base_account.sequence);
    const chainIdCosmos = 'evmos_9000-1';
    const chainId = 9000;

    // EIP712
    let fee = generateFee('20', denom, '200000', sender);
    let types = generateTypes(msgSendTypes);
    let msg = createMsgSend(amount, denom, sender, dest);
    let messages = generateMessage(
        accountId.toString(),
        sequence.toString(),
        chainIdCosmos,
        memo,
        fee,
        msg
    );
    let eipToSign = createEIP712(types, chainId, messages);

    // Cosmos
    let msgSend = protoMsgSend(sender, dest, amount, denom);
    let tx = createTransaction(
        msgSend,
        memo,
        '20',
        denom,
        200000,
        'ethsecp256',
        pubkey,
        sequence,
        accountId,
        chainIdCosmos,
        LEGACY_AMINO
    );

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myAccount = await signer.getAddress();
    let signature = await signer.provider.send('eth_signTypedData_v4', [
        myAccount,
        JSON.stringify(eipToSign),
    ]);
    console.log(signature);

    let web3 = createWeb3Extension(
        chainId,
        sender,
        Uint8Array.from(Buffer.from(signature.split('0x')[1], 'hex'))
    );
    let tempBody = createBody(msgSend, memo);
    tempBody.extension_options.push(createAnyMessage(web3));
    // tx.bodyBytes
    let txRaw = createTxRaw(
        tempBody.serializeBinary(),
        Buffer.from(tx.authInfoBytes, 'base64'),
        [new Uint8Array()]
    );
    console.log('txRaw');
    console.log(txRaw);
    console.log(txRaw.message.toObject());
    console.log(txRaw.message.toString());
    console.log(txRaw.message.serializeBinary());

    // console.log(JSON.stringify(`{ "tx_bytes": [${txRaw.message.serializeBinary().toString()}], "mode": "BROADCAST_MODE_SYNC" }`))
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{ "tx_bytes": [${txRaw.message
            .serializeBinary()
            .toString()}], "mode": "BROADCAST_MODE_SYNC" }`,
    };

    let a = await fetch(
        'http://localhost:1317/cosmos/tx/v1beta1/txs',
        requestOptions
    );
    values = await a.json();
    console.log(values);

    // curl - X POST \
    // -H "Content-Type: application/json" \
    // -d'{"tx_bytes":"{{txBytes}}","mode":"BROADCAST_MODE_SYNC"}' \
    // localhost: 1317 / cosmos / tx / v1beta1 / txs
    // createTxRaw,
    // createAnyMessage

    // let result = await broadcast(
    //     res.authInfoBytes,
    //     res.bodyBytes,
    //     res.eip,
    //     signature
    // );
    // console.log(result);

    // fireSuccess('TxSent', 'tx hash' + result.msg);

    // let algo = 'ethsecp256k1';
    // const response = await fetch(`${ REACT_APP_BACKEND_URL } / msg_send`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         wallet: {
    //             address: getWalletEvmos(),
    //             algo: algo,
    //             pubkey: getPubKey(),
    //         },
    //         destination: dest,
    //         amount: amount,
    //         denom: denom,
    //         memo: memo,
    //     }),
    // });
    // console.log(response);
    // let res = await response.json();
    // console.log('------------------------------------');
    // console.log(res);
    // console.log(res.eip);

    // let messageValue = JSON.parse(res.eip);
    // console.log(messageValue);

    // // let temp = new Uint8Array(
    // //     atob(messageValue.message.msgs[0])
    // //         .split('')
    // //         .map(function (c) {
    // //             return c.charCodeAt(0);
    // //         })
    // // );

    // function Utf8ArrayToStr(array) {
    //     var out, i, len, c;
    //     var char2, char3;

    //     out = '';
    //     len = array.length;
    //     i = 0;
    //     while (i < len) {
    //         c = array[i++];
    //         switch (c >> 4) {
    //             case 0:
    //             case 1:
    //             case 2:
    //             case 3:
    //             case 4:
    //             case 5:
    //             case 6:
    //             case 7:
    //                 // 0xxxxxxx
    //                 out += String.fromCharCode(c);
    //                 break;
    //             case 12:
    //             case 13:
    //                 // 110x xxxx   10xx xxxx
    //                 char2 = array[i++];
    //                 out += String.fromCharCode(
    //                     ((c & 0x1f) << 6) | (char2 & 0x3f)
    //                 );
    //                 break;
    //             case 14:
    //                 // 1110 xxxx  10xx xxxx  10xx xxxx
    //                 char2 = array[i++];
    //                 char3 = array[i++];
    //                 out += String.fromCharCode(
    //                     ((c & 0x0f) << 12) |
    //                     ((char2 & 0x3f) << 6) |
    //                     ((char3 & 0x3f) << 0)
    //                 );
    //                 break;
    //         }
    //     }

    //     return out;
    // }
    // function str2ab(str) {
    //     var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    //     var bufView = new Uint16Array(buf);
    //     for (var i = 0, strLen = str.length; i < strLen; i++) {
    //         bufView[i] = str.charCodeAt(i);
    //     }
    //     return buf;
    // }

    // // When sending aming values
    // let test = [
    //     123, 34, 116, 121, 112, 101, 34, 58, 34, 99, 111, 115, 109, 111, 115,
    //     45, 115, 100, 107, 47, 77, 115, 103, 83, 101, 110, 100, 34, 44, 34, 118,
    //     97, 108, 117, 101, 34, 58, 123, 34, 97, 109, 111, 117, 110, 116, 34, 58,
    //     91, 123, 34, 97, 109, 111, 117, 110, 116, 34, 58, 34, 49, 34, 44, 34,
    //     100, 101, 110, 111, 109, 34, 58, 34, 97, 112, 104, 111, 116, 111, 110,
    //     34, 125, 93, 44, 34, 102, 114, 111, 109, 95, 97, 100, 100, 114, 101,
    //     115, 115, 34, 58, 34, 101, 116, 104, 109, 49, 116, 102, 101, 103, 102,
    //     53, 48, 110, 53, 120, 108, 48, 104, 100, 53, 99, 120, 102, 122, 106, 99,
    //     97, 51, 121, 108, 115, 102, 112, 103, 48, 102, 110, 101, 100, 53, 103,
    //     113, 109, 34, 44, 34, 116, 111, 95, 97, 100, 100, 114, 101, 115, 115,
    //     34, 58, 34, 101, 116, 104, 109, 49, 116, 102, 101, 103, 102, 53, 48,
    //     110, 53, 120, 108, 48, 104, 100, 53, 99, 120, 102, 122, 106, 99, 97, 51,
    //     121, 108, 115, 102, 112, 103, 48, 102, 110, 101, 100, 53, 103, 113, 109,
    //     34, 125, 125,
    // ];
    // console.log(JSON.stringify(JSON.parse(Utf8ArrayToStr(test))));
    // // messageValue.message.msgs[0] = JSON.parse(
    // //     Utf8ArrayToStr(new Uint8Array(messageValue.message.msgs[0]))
    // // );
    // // console.log(messageValue.message.msgs);
    // // console.log(str2ab(messageValue.message.msgs[0].value));

    // // []uint8 len: 66, cap: 80, [25,1,43,154,205,116,175,198,194,137,179,28,184,121,135,246,70,7,176,27,150,103,176,20,69,112,98,17,231,215,144,150,239,77,180,142,97,219,172,17,237,109,23,63,193,131,35,228,112,254,136,160,147,187,20,79,128,182,97,191,126,235,16,126,167,66]
    // // messageValue.message.msgs[0].value = atob(messageValue.message.msgs[0].value);

    // console.log('JSON.stringify(messageValue)');
    // console.log(JSON.stringify(messageValue));
    // console.log('JSON.stringify(messageValue)--- end');

    // // let fee = generateFee(
    //     '20',
    //     'aphoton',
    //     '200000',
    //     'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm'
    // );
    // let types = generateTypes(msgSendTypes);
    // let msg = createMsgSend(
    //     '1',
    //     'aphoton',
    //     'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
    //     'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm'
    // );
    // let messages = generateMessage('9', '1', 'ethermint_9000-1', '', fee, msg);
    // let complete = createEIP712(types, 9000, messages);

    // console.log(complete);
    // console.log(JSON.stringify(complete));
    // console.log(JSON.stringify(messageValue) == JSON.stringify(complete));

    // console.log('-------------');
    // // import {
    // //     createMsgSend as protoMsgSend,
    //     createBody,
    //     createFee,
    //     createSignerInfo,
    //     createAuthInfo,
    //     createSigDoc,
    //     createTransaction,
    // } from '@tharsis/evmosjs/packages/proto'

    // let msg2 = protoMsgSend(
    //     'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
    //     'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
    //     '1',
    //     'aphoton'
    // );
    // let tx = createTransaction(
    //     msg2,
    //     '',
    //     '20',
    //     'aphoton',
    //     200000,
    //     'ethsecp256',
    //     'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
    //     1,
    //     9,
    //     '',
    //     LEGACY_AMINO
    // );

    // const body = createBody(msg2, '')
    // const feeMessage = createFee('20', 'aphoton', 200000)
    // const pubKeyDecoded = Buffer.from('AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ', 'base64')

    // console.log("body.serializeBinary()")
    // console.log(body.toObject())
    // console.log(body.serializeBinary())

    // const signInfo = createSignerInfo(
    //     'ethsecp256',
    //     new Uint8Array(pubKeyDecoded),
    //     1,
    //     127,
    // )

    // console.log("signInfo.serializeBinary()")
    // console.log(LEGACY_AMINO)
    // console.log(signInfo.toObject())
    // console.log(signInfo.serializeBinary())

    // const authInfo = createAuthInfo(signInfo, feeMessage)

    // console.log("authInfo.serializeBinary()")
    // console.log(authInfo.toObject())
    // console.log(authInfo.serializeBinary())

    // const signDoc = createSigDoc(
    //     body.serializeBinary(),
    //     authInfo.serializeBinary(),
    //     'ethermint_9000-1',
    //     9,
    // )

    // console.log("signDoc.serializeBinary()")
    // console.log(signDoc.toObject())
    // console.log(signDoc.serializeBinary())

    // const hash = new Keccak(256)
    // hash.update(Buffer.from(signDoc.serializeBinary()))
    // const toSign = hash.digest('binary')

    // const resqwe: any = {
    //     bodyBytes: Buffer.from(body.serializeBinary()).toString('base64'),
    //     authInfoBytes: Buffer.from(authInfo.serializeBinary()).toString('base64'),
    //     chianid: '9000',
    //     number: 9,
    //     signBytes: toSign.toString('base64'),
    // }
    // console.log(resqwe)

    // console.log('-------tx-------');
    // console.log(tx);
    // console.log(tx.bodyBytes == res.bodyBytes);

    // await window.ethereum.enable();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const myAccount = await signer.getAddress();
    // let signature = await signer.provider.send('eth_signTypedData_v4', [
    //     myAccount,
    //     JSON.stringify(messageValue),
    // ]);
    // console.log(signature);

    // // signature = "0x4f07917ea8089e513c64b511aafac21ae4aebcb0a1cfac439a037ed55f27ec31236f8d1b0d48415e9d1985ac5ed6164404f42f1c947b5df45c662c374376c3aa1b"

    // // let validate = await signer.provider.send('eth_recoverTypedSignature_V4', [
    // //     JSON.stringify(messageValue),
    // //     signature,
    // // ]);
    // // console.log(validate)

    // let result = await broadcast(
    //     res.authInfoBytes,
    //     res.bodyBytes,
    //     res.eip,
    //     signature
    // );
    // console.log(result);

    // fireSuccess('TxSent', 'tx hash' + result.msg);

    // var signDoc = new Uint8Array(
    //     atob(res.signBytes)
    //         .split('')
    //         .map(function (c) {
    //             return c.charCodeAt(0);
    //         })
    // );
    // res.converted = Buffer.from(signDoc).toString('hex');
    // console.log(res);
    // return res;
}

export async function undelegateAphoton(dest: string, amount: string) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL} / undelegate / `, {
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
    return null;
    return res;
}

export async function delegateAphoton(dest: string, amount: string) {
    let algo = 'ethsecp256k1';
    if (isKeplr()) {
        algo = 'secp256k1';
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL} / delegate / `, {
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
    eip: string,
    signature: string
) {
    let body = JSON.stringify({
        signature: signature,
        authBytes: authInfo,
        eip: eip,
        bodyBytes: bodyBytes,
    });
    console.log(body);

    const response = await fetch(`${REACT_APP_BACKEND_URL} / broadcast / `, {
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
