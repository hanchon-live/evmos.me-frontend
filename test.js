const tx =
    '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"string"},{"name":"salt","type":"string"}],"Tx":[{"name":"account_number","type":"string"},{"name":"chain_id","type":"string"},{"name":"fee","type":"Fee"},{"name":"memo","type":"string"},{"name":"msgs","type":"Msg[]"},{"name":"sequence","type":"string"}],"Fee":[{"name":"amount","type":"Coin[]"},{"name":"gas","type":"string"}],"Coin":[{"name":"denom","type":"string"},{"name":"amount","type":"string"}],"Msg":[{"name":"type","type":"string"},{"name":"value","type":"MsgValue"}],"MsgValue":[{"name":"from_address","type":"string"},{"name":"to_address","type":"string"},{"name":"amount","type":"TypeAmount[]"}],"TypeAmount":[{"name":"denom","type":"string"},{"name":"amount","type":"string"}]},"primaryType":"Tx","domain":{"name":"Cosmos Web3","version":"1.0.0","chainId":9000,"verifyingContract":"cosmos","salt":"0"},"message":{"account_number":"8","chain_id":"ethermint_9000-1","fee":{"amount":[{"denom":"aphoton","amount":"20"}],"gas":"200000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"1","denom":"aphoton"}],"from_address":"ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm","to_address":"ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm"}}],"sequence":"0"}}';

import { ethers } from 'ethers';
import { TypedDataUtils } from 'ethers-eip712';

async function testTx() {
    console.log(tx);
    const digest = TypedDataUtils.encodeDigest(tx);
    console.log('digest');
    console.log(digest);
    console.log('ethermint');
    console.log([
        99, 204, 78, 207, 150, 58, 104, 31, 234, 195, 208, 243, 136, 152, 59,
        208, 40, 157, 37, 13, 251, 249, 32, 73, 208, 117, 133, 210, 72, 69, 102,
        18,
    ]);
    const digestHex = ethers.utils.hexlify(digest);
    console.log(digestHex);

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myAccount = await signer.getAddress();
    const signature = await signer.provider.send('eth_signTypedData_v4', [
        myAccount,
        JSON.stringify(newTx),
    ]);
    console.log(signature);
}

(async () => {
    testTx();
})();
