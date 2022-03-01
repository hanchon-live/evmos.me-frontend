import { Chain, createMessageSend, Sender } from '@tharsis/transactions';

export async function createMsgSendTransaction(
    dest: string,
    amount: string,
    denom: string,
    memo: string,
    sender: Sender,
    chain: Chain
) {
    const fee = {
        amount: '20',
        denom: 'aevmos',
        gas: '200000',
    };

    const params = {
        destinationAddress: dest,
        amount: amount,
        denom: denom,
    };

    return createMessageSend(chain, sender, fee, memo, params);
}
