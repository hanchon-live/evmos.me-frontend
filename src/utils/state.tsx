import React, { createContext, useReducer } from 'react';

const initialState = {
    walletEvmos: 'evmos1...',
    walletEth: '0x...',
    pubkey: 'At/+...',
    provider: '',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'wallet':
                return {
                    ...state,
                    walletEth: action.payload.walletEth,
                    walletEvmos: action.payload.walletEvmos,
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
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
