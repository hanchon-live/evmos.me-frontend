import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { REACT_APP_BACKEND_URL } from './contants';

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
