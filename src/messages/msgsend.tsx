import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {
    Box,
    Center,
    GridItem,
    Heading,
    SimpleGrid,
    VStack,
} from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react';
import { ethToEthermint } from '@hanchon/ethermint-address-converter';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import { signTransaction, callSendAphoton, broadcast } from '../utils/backend';

import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { listen } from '@ledgerhq/logs';
import AppEth from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';

export async function executeMsgSend(
    dest: string,
    amount: string,
    denom: string,
    memo: string
) {
    if (denom == '') {
        denom = 'aphoton';
    }

    if (dest.split('evmos').length != 2) {
        if (dest.split('0x').length == 2) {
            dest = ethToEthermint(dest);
        } else {
            fireError('Msg Send', 'Invalid destination!');
            return false;
        }
    }
    if (Number(amount) === NaN) {
        fireError('Msg Send', 'Invalid amount!');
        return false;
    }
    let res = await callSendAphoton(dest, amount, denom, memo);

    // let signed = await signTransaction(res);
    // if (signed === null || signed === undefined) {
    //     return fireError('Msg Send', 'Could not sign the message');
    // }
    // let result = await broadcast(
    //     signed.authBytes,
    //     signed.bodyBytes,
    //     signed.signature
    // );
    // if (result.res === true) {
    //     return fireSuccess(
    //         'Msg Send',
    //         `Transaction sent with hash: ${result.msg}`
    //     );
    // }
    // return fireError(
    //     'Msg Send',
    //     `Error sending the transaction: ${result.msg}`
    // );
}
let transport: Transport;
let appEth: AppEth;
const MsgSend = () => {
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    const [denom, setDenom] = useState('aphoton');
    const [memo, setMemo] = useState('');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Msg Send</Heading>
            <Button
                onClick={async () => {
                    console.log('hola');
                    try {
                        transport = await TransportWebHID.create();
                        listen((log) => console.log(log));
                        appEth = new AppEth(transport);
                    } catch (e) {
                        console.log(e);
                    }

                    const { publicKey, address, chainCode } =
                        await appEth.getAddress("44'/60'/0'/0/0");
                    console.log(publicKey);
                    console.log(address);
                    console.log(chainCode);
                    console.log(appEth);
                    console.log(
                        Buffer.from(
                            '0000000000000000000000000000000000000000000000000000000000000000',
                            'hex'
                        )
                    );
                    // let res = await transport.send(0xe0, 0x08, 0x00, 0x00, Buffer.from([0]))
                    const data = Buffer.from(
                        '0000000000000000000000000000000000000000000000000000000000000000',
                        'hex'
                    );
                    const response = await transport.exchange(data);
                    //     Buffer.concat([
                    //         Buffer.from([data.length]),
                    //         data,
                    //     ])
                    // );
                    const sw = response.readUInt16BE(response.length - 2);
                    console.log(sw);

                    // let sig = await appEth.signPersonalMessage("44'/60'/0'/0/0", "0000000000000000000000000000000000000000000000000000000000000000")
                    // console.log(sig)
                    // let sig2 = await appEth.signTransaction("44'/60'/0'/0/0", "e1a00000000000000000000000000000000000000000000000000000000000000000", null)
                    // let sig3 = await appEth.signEIP712HashedMessage("44'/60'/0'/0/0", "0000000000000000000000000000000000000000000000000000000000000000")
                }}
            >
                Test
            </Button>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Destination</FormLabel>
                        <Input
                            placeholder="0x.. or evmos1..."
                            type="text"
                            onChange={(e) => setDest(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="amountSendControl">
                        <FormLabel id="amountSend">Amount</FormLabel>
                        <Input
                            placeholder="1000000000000000000"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="denomSendControl">
                        <FormLabel id="denomSend">Coin(Optional)</FormLabel>
                        <Input
                            placeholder="aphoton"
                            type="text"
                            onChange={(e) => setDenom(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="memoSendControl">
                        <FormLabel id="memoSend">Memo</FormLabel>
                        <Input
                            placeholder=""
                            type="text"
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]} h="full">
                    <Center w="full">
                        <FormControl id="buttonSendControl">
                            <Button
                                w="full"
                                bg="teal.300"
                                color="white"
                                onClick={() => {
                                    executeMsgSend(dest, amount, denom, memo);
                                }}
                            >
                                Send Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default MsgSend;
