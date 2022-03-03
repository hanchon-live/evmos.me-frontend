import { Fee } from '@tharsis/transactions';
import { Chain, createMessageSend, Sender } from '@tharsis/transactions';

export async function createMsgSendTransaction(
    dest: string,
    amount: string,
    denom: string,
    memo: string,
    sender: Sender,
    chain: Chain,
    fee: Fee
) {
    const params = {
        destinationAddress: dest,
        amount: amount,
        denom: denom,
    };

    return createMessageSend(chain, sender, fee, memo, params);
}
