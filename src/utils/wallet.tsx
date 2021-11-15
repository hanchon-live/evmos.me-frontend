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

export function disconnectWallet(state) {
    unsetWalletEth();
    unsetWalletEvmos();
    unsetPubKey();
    unsetProvider();
    state.dispatch({ type: 'cleanup', payload: {} });
    return true;
}

export function reconnectWallet(state) {
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
    }
}
