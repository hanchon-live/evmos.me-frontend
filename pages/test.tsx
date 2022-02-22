// const tx = { "types": { "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "string" }, { "name": "salt", "type": "string" }], "Tx": [{ "name": "account_number", "type": "string" }, { "name": "chain_id", "type": "string" }, { "name": "fee", "type": "Fee" }, { "name": "memo", "type": "string" }, { "name": "msgs", "type": "Msg[]" }, { "name": "sequence", "type": "string" }], "Fee": [{ "name": "amount", "type": "Coin[]" }, { "name": "gas", "type": "string" }], "Coin": [{ "name": "denom", "type": "string" }, { "name": "amount", "type": "string" }], "Msg": [{ "name": "type", "type": "string" }, { "name": "value", "type": "MsgValue" }], "MsgValue": [{ "name": "from_address", "type": "string" }, { "name": "to_address", "type": "string" }, { "name": "amount", "type": "TypeAmount[]" }], "TypeAmount": [{ "name": "denom", "type": "string" }, { "name": "amount", "type": "string" }] }, "primaryType": "Tx", "domain": { "name": "Cosmos Web3", "version": "1.0.0", "chainId": 9000, "verifyingContract": "cosmos", "salt": "0" }, "message": { "account_number": "8", "chain_id": "ethermint_9000-1", "fee": { "amount": [{ "denom": "aphoton", "amount": "20" }], "gas": "200000" }, "memo": "", "msgs": [{ "type": "cosmos-sdk/MsgSend", "value": { "amount": [{ "amount": "1", "denom": "aphoton" }], "from_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm", "to_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm" } }], "sequence": "0" } }

// const tx = {
//     "types": {
//         "EIP712Domain": [
//             { "name": "name", "type": "string" },
//             { "name": "version", "type": "string" },
//             { "name": "chainId", "type": "uint256" },
//             { "name": "verifyingContract", "type": "string" },
//             { "name": "salt", "type": "string" }
//         ],
//         "Tx": [
//             { "name": "account_number", "type": "string" },
//             { "name": "chain_id", "type": "string" },
//             { "name": "fee", "type": "Fee" },
//             { "name": "memo", "type": "string" },
//             { "name": "msgs", "type": "Msg[]" },
//             { "name": "sequence", "type": "string" }
//         ],
//         "Fee": [
//             { "name": "feePayer", "type": "string" },
//             { "name": "amount", "type": "Coin[]" },
//             { "name": "gas", "type": "string" }
//         ],
//         "Coin": [
//             { "name": "denom", "type": "string" },
//             { "name": "amount", "type": "string" }
//         ],
//         "Msg": [
//             { "name": "type", "type": "string" },
//             { "name": "value", "type": "MsgValue" }
//         ],
//         "MsgValue": [
//             { "name": "from_address", "type": "string" },
//             { "name": "to_address", "type": "string" },
//             { "name": "amount", "type": "TypeAmount[]" }
//         ],
//         "TypeAmount": [
//             { "name": "denom", "type": "string" },
//             { "name": "amount", "type": "string" }
//         ]
//     },
//     "primaryType": "Tx",
//     "domain": {
//         "name": "Cosmos Web3",
//         "version": "1.0.0",
//         "chainId": 9000,
//         "verifyingContract": "cosmos",
//         "salt": "0"
//     },
//     "message": {
//         "account_number": "8",
//         "chain_id": "ethermint_9000-1",
//         "fee": {
//             "amount": [
//                 {
//                     "amount": "20",
//                     "denom": "aphoton"
//                 }
//             ],
//             "gas": "200000",
//             "feePayer": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm"
//         },
//         "memo": "",
//         "msgs": [
//             {
//                 "type": "cosmos-sdk/MsgSend",
//                 "value": {
//                     "amount": [
//                         {
//                             "amount": "1",
//                             "denom": "aphoton"
//                         }
//                     ],
//                     "from_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm",
//                     "to_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm"
//                 }
//             }
//         ],
//         "sequence": "0"
//     }
// }

// const tx = { "types": { "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "string" }, { "name": "salt", "type": "string" }], "Tx": [{ "name": "account_number", "type": "string" }, { "name": "chain_id", "type": "string" }, { "name": "fee", "type": "Fee" }, { "name": "memo", "type": "string" }, { "name": "msgs", "type": "Msg[]" }, { "name": "sequence", "type": "string" }], "Fee": [{ "name": "amount", "type": "Coin[]" }, { "name": "gas", "type": "string" }, { "name": "feePayer", "type": "string" }], "Coin": [{ "name": "denom", "type": "string" }, { "name": "amount", "type": "string" }], "Msg": [{ "name": "type", "type": "string" }, { "name": "value", "type": "MsgValue" }], "MsgValue": [{ "name": "amount", "type": "TypeAmount[]" }, { "name": "from_address", "type": "string" }, { "name": "to_address", "type": "string" }], "TypeAmount": [{ "name": "amount", "type": "string" }, { "name": "denom", "type": "string" }] }, "primaryType": "Tx", "domain": { "name": "Cosmos Web3", "version": "1.0.0", "chainId": 9000, "verifyingContract": "cosmos", "salt": "0" }, "message": { "account_number": "8", "chain_id": "ethermint_9000-1", "fee": { "amount": [{ "denom": "aphoton", "amount": "20" }], "gas": "200000", "feePayer": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm", }, "memo": "", "msgs": [{ "type": "cosmos-sdk/MsgSend", "value": { "amount": [{ "amount": "1", "denom": "aphoton" }], "from_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm", "to_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm" } }], "sequence": "0" } }

const tx = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'string' },
            { name: 'salt', type: 'string' },
        ],
        Tx: [
            { name: 'account_number', type: 'string' },
            { name: 'chain_id', type: 'string' },
            { name: 'fee', type: 'Fee' },
            { name: 'memo', type: 'string' },
            { name: 'msgs', type: 'Msg[]' },
            { name: 'sequence', type: 'string' },
        ],
        Fee: [
            { name: 'feePayer', type: 'string' },
            { name: 'amount', type: 'Coin[]' },
            { name: 'gas', type: 'string' },
        ],
        Coin: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'string' },
        ],
        Msg: [
            { name: 'type', type: 'string' },
            { name: 'value', type: 'MsgValue' },
        ],
        MsgValue: [
            { name: 'from_address', type: 'string' },
            { name: 'to_address', type: 'string' },
            { name: 'amount', type: 'TypeAmount[]' },
        ],
        TypeAmount: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'string' },
        ],
    },
    primaryType: 'Tx',
    domain: {
        name: 'Cosmos Web3',
        version: '1.0.0',
        chainId: 9000,
        verifyingContract: 'cosmos',
        salt: '0',
    },
    message: {
        account_number: '8',
        chain_id: 'ethermint_9000-1',
        fee: {
            amount: [{ amount: '20', denom: 'aphoton' }],
            gas: '200000',
            feePayer: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
        },
        memo: '',
        msgs: [
            {
                type: 'cosmos-sdk/MsgSend',
                value: {
                    amount: [{ amount: '1', denom: 'aphoton' }],
                    from_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
                    to_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
                },
            },
        ],
        sequence: '0',
    },
};
const newTx = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'string' },
            { name: 'salt', type: 'string' },
        ],
        Tx: [
            { name: 'account_number', type: 'string' },
            { name: 'chain_id', type: 'string' },
            { name: 'fee', type: 'Fee' },
            { name: 'memo', type: 'string' },
            { name: 'msgs', type: 'Msg[]' },
            { name: 'sequence', type: 'string' },
        ],
        Fee: [
            { name: 'feePayer', type: 'string' },
            { name: 'amount', type: 'Coin[]' },
            { name: 'gas', type: 'string' },
        ],
        Coin: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'string' },
        ],
        Msg: [
            { name: 'type', type: 'string' },
            { name: 'value', type: 'MsgValue' },
        ],
        MsgValue: [
            { name: 'from_address', type: 'string' },
            { name: 'to_address', type: 'string' },
            { name: 'amount', type: 'TypeAmount[]' },
        ],
        TypeAmount: [
            { name: 'denom', type: 'string' },
            { name: 'amount', type: 'string' },
        ],
    },
    primaryType: 'Tx',
    domain: {
        name: 'Cosmos Web3',
        version: '1.0.0',
        chainId: 9000,
        verifyingContract: 'cosmos',
        salt: '0',
    },
    message: {
        account_number: '8',
        chain_id: 'ethermint_9000-1',
        fee: {
            amount: [{ amount: '20', denom: 'aphoton' }],
            gas: '200000',
            feePayer: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
        },
        memo: '',
        msgs: [
            {
                type: 'cosmos-sdk/MsgSend',
                value: {
                    amount: [{ amount: '1', denom: 'aphoton' }],
                    from_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
                    to_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
                },
            },
        ],
        sequence: '1',
    },
};
import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
// import { TypedDataUtils } from 'ethers-eip712';

import {
    computeAddress,
    recoverAddress,
    serialize,
    UnsignedTransaction,
} from '@ethersproject/transactions';

// async function testTx() {
//     console.log(JSON.stringify(tx));
//     console.log(tx);
//     const digest = TypedDataUtils.encodeDigest(tx);
//     console.log('digest');
//     console.log(digest);
//     console.log('ethermint');
//     console.log([
//         99, 204, 78, 207, 150, 58, 104, 31, 234, 195, 208, 243, 136, 152, 59,
//         208, 40, 157, 37, 13, 251, 249, 32, 73, 208, 117, 133, 210, 72, 69, 102,
//         18,
//     ]);
//     const digestHex = ethers.utils.hexlify(digest);
//     console.log(digestHex);

//     let a = ethers.Wallet.fromMnemonic("degree vote just ribbon floor dad soup antenna way strategy chair good")
//     const signature2 = await a.signMessage(digest)
//     console.log("sig2")
//     console.log(signature2)

//     console.log(recoverAddress(digest, signature2))

//     // console.log(a.getAddress())
//     // sig 2
//     // 0x336e4d70139903e8caf5251c2bb47764ae4eb6e91b014cd6e5edfdd4658695c3636104557b84fdb1b8dd38d5ca68d2974999a31fd8f90ce375453a641221a5921c
//     // sig 1
//     // 0x695ae713af99d8049da0eb5d382e827df8fc5edbc15410e4810b00982e34c75a127c33fb6bdc89a19eaf830e020a52532e867602bf8f5d29dd05c04afb19b4701c

//     // await window.ethereum.enable();
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const signer = provider.getSigner();
//     // const myAccount = await signer.getAddress();
//     // const signature = await signer.provider.send('eth_signTypedData_v4', [
//     //     myAccount,
//     //     JSON.stringify(tx),
//     // ]);
//     // console.log("sig1")
//     // console.log(signature);
// }
import {
    signTypedData,
    SignTypedDataVersion,
    TypedDataUtils,
} from '@metamask/eth-sig-util';
import { ethToEthermint } from '@hanchon/ethermint-address-converter';
async function test2() {
    console.log(ethToEthermint('0x5A7284d1f3A1BeFbB69832452C7624fC12143D33'));
    let a = signTypedData({
        privateKey: Buffer.from(
            '642e65d3ac953fab6264aa119bed90321af8a8998417bb01d6b973b2fef7bbe4',
            'hex'
        ),
        data: newTx,
        version: SignTypedDataVersion.V4,
    });

    console.log(a);
    console.log(TypedDataUtils.eip712Hash(newTx, SignTypedDataVersion.V4));
    console.log(
        recoverAddress(
            TypedDataUtils.eip712Hash(newTx, SignTypedDataVersion.V4),
            a
        )
    );
}
import { fromHexString, signatureToPubkey } from '@hanchon/signature-to-pubkey';
import {
    bufferToHex,
    bufferToInt,
    ecrecover,
    fromUtf8,
    hashPersonalMessage,
    pubToAddress,
    toBuffer,
} from 'ethereumjs-util';

function test123() {
    // console.log(fromUtf8('generate_pubkey'))
    // let a = fromUtf8('generate_pubkey')
    // let digest = fromUtf8('"\x19Ethereum Signed Message:\n"') + a.length + a

    let msg = hashPersonalMessage(toBuffer(fromUtf8('generate_pubkey')));
    let message = Buffer.from([
        50, 215, 18, 245, 169, 63, 252, 16, 225, 169, 71, 95, 254, 165, 146,
        216, 40, 162, 115, 78, 147, 125, 80, 182, 25, 69, 136, 250, 65, 200, 94,
        178,
    ]);

    console.log(msg);
    console.log(msg);
    let sig =
        '0x3ec9e5c59d9d6727e42ce2af67bb36c11a342f2877e2c15c49dec3015769efb86432a0c843a10c0b0d8b86b6e73a4a7ae8ba749a9d7d37ab7e6a88d26cac7b0f1c';
    const r = toBuffer(sig.slice(0, 66));
    const s = toBuffer('0x' + sig.slice(66, 130));
    const v = bufferToInt(toBuffer('0x' + sig.slice(130, 132)));

    const pub = ecrecover(msg, v, r, s);
    console.log(Buffer.from(pub).toString('base64'));
    const addr = pubToAddress(pub);
    console.log(addr);
    console.log(bufferToHex(addr));

    // // recoverPublicKey(arrayify(digest), signature)
    let b = signatureToPubkey(sig, message);
    console.log(b);
}

const test = () => {
    return (
        <div>
            {/* <Button onClick={async () => await testTx()}> test</Button > */}
            <Button onClick={async () => await test123()}> test2</Button>
        </div>
    );
};

export default test;
