import React from 'react';

import { useContext, useEffect } from 'react';
import { getAllBalances } from './backend';
import {
    getProvider,
    getPubKey,
    getWalletEth,
    getWalletEvmos,
    unsetProvider,
    unsetPubKey,
    unsetWalletEth,
    unsetWalletEvmos,
} from './db';
import { BalanceCosmos, GlobalState, store } from './state';

export function disconnectWallet(state: GlobalState) {
    unsetWalletEth();
    unsetWalletEvmos();
    unsetPubKey();
    unsetProvider();
    state.dispatch({ type: 'cleanup', payload: {} });
    return true;
}

export async function reconnectWallet(state: GlobalState) {
    const walletEth = getWalletEth();
    if (walletEth !== null) {
        const walletEvmos = getWalletEvmos();
        const pubkey = getPubKey();
        const provider = getProvider();
        state.dispatch({
            type: 'wallet',
            payload: {
                walletEth: walletEth,
                walletEvmos: walletEvmos,
            },
        });
        state.dispatch({ type: 'pubkey', payload: { pubkey } });
        state.dispatch({ type: 'provider', payload: { provider } });
        await queryBalances(state);
    }
}

export async function queryBalances(store: GlobalState) {
    const wallet = getWalletEvmos();
    let balance: BalanceCosmos[] = [];
    if (wallet !== null) {
        balance = await getAllBalances(wallet);
    }
    store.dispatch({ type: 'cosmosCoins', payload: balance });
}

export function WalletInitializer() {
    const globalState = useContext(store);
    useEffect(() => {
        reconnectWallet(globalState);
    }, []);
    return <></>;
}
