import {
    ethToEthermint,
    evmosToEth,
} from '@hanchon/ethermint-address-converter';
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

export async function getAllBalances(address: string) {
    if (address === null) {
        return { balances: [] };
    }
    if (address.split('0x').length == 2) {
        address = ethToEthermint(address);
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
        address = ethToEthermint(address);
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

export async function callSendAphoton(
    dest: string,
    amount: string,
    denom: string,
    memo: string
) {
    let algo = 'ethsecp256k1';
    const response = await fetch(`${REACT_APP_BACKEND_URL}/msg_send`, {
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
            denom: denom,
            memo: memo,
        }),
    });
    console.log(response);
    let res = await response.json();
    console.log('------------------------------------');
    console.log(res);
    console.log(res.eip);

    let messageValue = JSON.parse(res.eip);
    console.log(messageValue);

    // let temp = new Uint8Array(
    //     atob(messageValue.message.msgs[0])
    //         .split('')
    //         .map(function (c) {
    //             return c.charCodeAt(0);
    //         })
    // );

    function Utf8ArrayToStr(array) {
        var out, i, len, c;
        var char2, char3;

        out = '';
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(
                        ((c & 0x1f) << 6) | (char2 & 0x3f)
                    );
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(
                        ((c & 0x0f) << 12) |
                            ((char2 & 0x3f) << 6) |
                            ((char3 & 0x3f) << 0)
                    );
                    break;
            }
        }

        return out;
    }
    function str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    // When sending aming values
    messageValue.message.msgs[0] = JSON.parse(
        Utf8ArrayToStr(new Uint8Array(messageValue.message.msgs[0]))
    );
    console.log(messageValue.message.msgs);
    console.log(str2ab(messageValue.message.msgs[0].value));

    // []uint8 len: 66, cap: 80, [25,1,43,154,205,116,175,198,194,137,179,28,184,121,135,246,70,7,176,27,150,103,176,20,69,112,98,17,231,215,144,150,239,77,180,142,97,219,172,17,237,109,23,63,193,131,35,228,112,254,136,160,147,187,20,79,128,182,97,191,126,235,16,126,167,66]
    // messageValue.message.msgs[0].value = atob(messageValue.message.msgs[0].value);

    console.log('JSON.stringify(messageValue)');
    console.log(JSON.stringify(messageValue));
    console.log('JSON.stringify(messageValue)--- end');

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myAccount = await signer.getAddress();
    let signature = await signer.provider.send('eth_signTypedData_v4', [
        myAccount,
        JSON.stringify(messageValue),
    ]);
    console.log(signature);

    // signature = "0x4f07917ea8089e513c64b511aafac21ae4aebcb0a1cfac439a037ed55f27ec31236f8d1b0d48415e9d1985ac5ed6164404f42f1c947b5df45c662c374376c3aa1b"

    // let validate = await signer.provider.send('eth_recoverTypedSignature_V4', [
    //     JSON.stringify(messageValue),
    //     signature,
    // ]);
    // console.log(validate)

    let result = await broadcast(
        res.authInfoBytes,
        res.bodyBytes,
        res.eip,
        signature
    );

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
    const response = await fetch(`${REACT_APP_BACKEND_URL}/undelegate/`, {
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
