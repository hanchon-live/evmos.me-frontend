import { Chain, Sender, TxGenerated } from '@tharsis/transactions';
import { fireError } from '../../landing/alert';
import { broadcastEIP712Transaction } from '../blockchain/broadcast';
import { getWalletEth, isMetamask } from '../db';

export async function signCosmosAndBroadcastWithMetamask(
    chain: Chain,
    sender: Sender,
    res: TxGenerated
) {
    if (isMetamask()) {
        const ethWallet = getWalletEth();
        if (ethWallet == null) {
            return false;
        }
        let signature = '';
        try {
            signature = await window.ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [ethWallet, JSON.stringify(res.eipToSign)],
            });
        } catch (e) {
            fireError('Metamask', 'Metamask error!');
            return false;
        }

        await broadcastEIP712Transaction(chain, sender, signature, res);
        return true;
    }
    return false;
}
