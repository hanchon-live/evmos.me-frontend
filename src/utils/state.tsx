import React, { createContext, useReducer } from 'react';
import internal from 'stream';
import { ethToEvmos } from '@hanchon/ethermint-address-converter';

interface Action {
    type: string;
    payload: any;
}

export interface Balance {
    denom: string;
    amount: string;
}
export interface BalanceCosmos {
    balances: Balance[];
    pagination: {
        total: string;
        nextKey: string;
    };
}

export interface BalanceERC20Item {
    name: string;
    symbol: string;
    decimals: string;
    balance: string;
    address: string;
}
export interface GlobalState {
    state: {
        walletEvmos: string;
        walletEth: string;
        pubkey: string;
        provider: string;
        balanceCosmos: Balance[];
        balanceERC20: BalanceERC20Item[];
        aphoton: string;
    };
    dispatch: React.Dispatch<Action>;
}

const initialState: any = {
    walletEvmos: 'evmos1...',
    walletEth: '0x...',
    pubkey: 'At/+...',
    provider: '',
    balanceCosmos: [],
    balanceERC20: [],
    aphoton: '0',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: Action) => {
        switch (action.type) {
            case 'wallet':
                return {
                    ...state,
                    walletEth: action.payload.walletEth,
                    walletEvmos: ethToEvmos(action.payload.walletEth),
                };
            case 'pubkey':
                return { ...state, pubkey: action.payload.pubkey };
            case 'provider':
                return { ...state, provider: action.payload.provider };
            case 'cleanup':
                return initialState;
            case 'update':
                const newState = action.payload;
                return newState;
            case 'cosmosCoins':
                let temp = action.payload.balances.filter((e: Balance) => {
                    if (e.denom == 'aevmos') {
                        return true;
                    }
                });
                return {
                    ...state,
                    balanceCosmos: action.payload.balances,
                    aphoton: temp.length == 1 ? temp[0].amount : 0,
                };
            case 'erc20Coins':
                return {
                    ...state,
                    balanceERC20: action.payload,
                };
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
