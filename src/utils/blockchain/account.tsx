import { accountEndpoint } from '@tharsis/provider';
import { getPubKey, getWalletEvmos } from '../db';

export async function getAccount() {
    // TODO: abstract this logic as get account
    const userWallet = getWalletEvmos();
    if (userWallet == null) {
        return null;
    }
    const pubkey = getPubKey();
    if (pubkey == null) {
        return null;
    }

    const get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    let resp;
    try {
        let addr = await fetch(
            `http://127.0.0.1:1317${accountEndpoint}${userWallet}`,
            get
        );
        // If error 400 wallet doesn't exists
        resp = await addr.json();
    } catch (e) {
        console.error(e);
        return null;
    }

    return {
        accountAddress: userWallet,
        sequence: parseInt(resp.account.base_account.sequence),
        accountNumber: parseInt(resp.account.base_account.account_number),
        pubkey: pubkey,
    };
}
