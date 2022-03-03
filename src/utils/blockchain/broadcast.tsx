import {
    Chain,
    createTxRawEIP712,
    Sender,
    signatureToWeb3Extension,
    TxGenerated,
} from '@tharsis/transactions';
import { fireError, fireSuccess } from '../../landing/alert';
import { broadcastEndpoint } from '@tharsis/provider';
import { REACT_APP_NODE_URL } from '../contants';
import { createTxRaw } from '@tharsis/proto';

export function TxSentAlert(hash: string) {
    return fireSuccess(
        'Transaction sent!',
        `Transaction sent with hash: ${hash}`
    );
}

export async function broadcastEIP712Transaction(
    chain: Chain,
    sender: Sender,
    signature: string,
    tx: TxGenerated
    // tx: any
) {
    // The chain and sender objects are the same as the previous example
    let extension = signatureToWeb3Extension(chain, sender, signature);

    // Create the txRaw
    let rawTx = createTxRawEIP712(
        tx.legacyAmino.body,
        tx.legacyAmino.authInfo,
        extension
    );

    // Broadcast it
    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{ "tx_bytes": [${rawTx.message
            .serializeBinary()
            .toString()}], "mode": "BROADCAST_MODE_SYNC" }`,
    };

    let broadcastPost = await fetch(
        `${REACT_APP_NODE_URL}${broadcastEndpoint}`,
        postOptions
    );
    console.log(broadcastPost);
    let response = await broadcastPost.json();
    console.log(response);
    if (response.tx_response.code != 0) {
        return fireError('Transaction Failed', response.tx_response.rawLog);
    }
    return TxSentAlert(response.tx_response.txhash);
}

export async function broadcastCosmosTransaction(
    chain: Chain,
    sender: Sender,
    bodyBytes: Uint8Array,
    authInfoBytes: Uint8Array,
    signature: Uint8Array
) {
    let rawTx = createTxRaw(bodyBytes, authInfoBytes, [signature]);

    // Broadcast it
    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{ "tx_bytes": [${rawTx.message
            .serializeBinary()
            .toString()}], "mode": "BROADCAST_MODE_SYNC" }`,
    };

    let broadcastPost = await fetch(
        `${REACT_APP_NODE_URL}${broadcastEndpoint}`,
        postOptions
    );
    console.log(broadcastPost);
    let response = await broadcastPost.json();
    console.log(response);
    if (response.tx_response.code != 0) {
        return fireError('Transaction Failed', response.tx_response.rawLog);
    }
    return TxSentAlert(response.tx_response.txhash);
}
