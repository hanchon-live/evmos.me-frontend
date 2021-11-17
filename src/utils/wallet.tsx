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
import { BalanceCosmos, GlobalState } from './state';

export function disconnectWallet(state: GlobalState) {
    unsetWalletEth();
    unsetWalletEvmos();
    unsetPubKey();
    unsetProvider();
    state.dispatch({ type: 'cleanup', payload: {} });
    return true;
}

export async function reconnectWallet(state: GlobalState) {
    let walletEth = getWalletEth();
    if (walletEth !== null) {
        let walletEvmos = getWalletEvmos();
        let pubkey = getPubKey();
        let provider = getProvider();
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
    let wallet = getWalletEvmos();
    let balance: BalanceCosmos[] = [];
    if (wallet !== null) {
        balance = await getAllBalances(wallet);
        console.log(balance);
    }
    store.dispatch({ type: 'cosmosCoins', payload: balance });
}
