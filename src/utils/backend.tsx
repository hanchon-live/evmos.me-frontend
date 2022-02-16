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

    let culo = JSON.parse(res.eip);
    console.log(culo);

    // let temp = new Uint8Array(
    //     atob(culo.message.msgs[0])
    //         .split('')
    //         .map(function (c) {
    //             return c.charCodeAt(0);
    //         })
    // );

    culo.message.msgs[0].value = atob(culo.message.msgs[0].value);

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myAccount = await signer.getAddress();
    const signature = await signer.provider.send('eth_signTypedData_v4', [
        myAccount,
        JSON.stringify(culo),
    ]);
    console.log(signature);

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
