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
import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import { signTransaction, callSendAphoton, broadcast } from '../utils/backend';

import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { listen } from '@ledgerhq/logs';
import AppEth from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';
import { createMsgSendTransaction } from '../utils/transactions/msgSend';
import { getWalletEth, isMetamask } from '../utils/db';

import { broadcastEndpoint } from '@tharsis/provider';
import {
    createTxRawEIP712,
    signatureToWeb3Extension,
} from '@tharsis/transactions';
import { evmosToEth } from '@tharsis/address-converter';
import { getAccount } from '../utils/blockchain/account';
import { chain } from '../utils/blockchain/chain';
import { TxSentAlert } from '../alerts/alerts';
import { broadcastEIP712Transaction } from '../utils/blockchain/broadcast';

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
            dest = ethToEvmos(dest);
        } else {
            fireError('Msg Send', 'Invalid destination!');
            return false;
        }
    }
    if (Number(amount) === NaN) {
        fireError('Msg Send', 'Invalid amount!');
        return false;
    }

    const sender = await getAccount();
    if (sender == null) {
        return;
    }

    // TODO: set fee here
    let res = await createMsgSendTransaction(
        dest,
        amount,
        denom,
        memo,
        sender,
        chain
    );

    // TODO: abstract this as metamask signing
    if (isMetamask()) {
        const ethWallet = getWalletEth();
        if (ethWallet == null) {
            return;
        }
        let signature = await window.ethereum.request({
            method: 'eth_signTypedData_v4',
            params: [ethWallet, JSON.stringify(res.eipToSign)],
        });
        console.log('signature');
        console.log(signature);

        await broadcastEIP712Transaction(chain, sender, signature, res);
        return;
    }
}

import { createTxIBCMsgTransfer } from '@tharsis/transactions';

export async function executeIBC() {
    const sender = await getAccount();
    if (sender == null) {
        return;
    }

    const fee = {
        amount: '20',
        denom: 'aevmos',
        gas: '200000',
    };

    // export interface MessageIBCMsgTransfer {
    //     // Channel
    //     sourcePort: string,
    //     sourceChannel: string,
    //     // Token
    //     amount: string,
    //     denom: string,
    //     // Addresses
    //     receiver: string,
    //     // Timeout
    //     revisionNumber: number,
    //     revisionHeight: number,
    //     timeoutTimestamp: number,
    //   }

    //   export function createTxIBCMsgTransfer(
    //     chain: Chain,
    //     sender: Sender,
    //     fee: Fee,
    //     memo: string,
    //     params: MessageIBCMsgTransfer,

    // TODO: set fee here
    let res = await createTxIBCMsgTransfer(
        chain,
        sender,
        fee,
        'Hanchon IBC EIP712 transaction',
        {
            sourcePort: 'transfer',
            sourceChannel: 'channel-0',
            // Token
            amount: '10000',
            denom: 'aevmos',
            // Addresses
            receiver: 'osmo1pmk2r32ssqwps42y3c9d4clqlca403yd05x9ye',
            // Timeout
            revisionNumber: 1,
            revisionHeight: 3441472,
            timeoutTimestamp: '1646328911000000000',
        }
    );

    console.dir(res.eipToSign);

    console.log(JSON.stringify(res.eipToSign));

    // TODO: abstract this as metamask signing
    if (isMetamask()) {
        const ethWallet = getWalletEth();
        if (ethWallet == null) {
            return;
        }
        let signature = await window.ethereum.request({
            method: 'eth_signTypedData_v4',
            params: [ethWallet, JSON.stringify(res.eipToSign)],
        });
        console.log('signature');
        console.log(signature);

        await broadcastEIP712Transaction(chain, sender, signature, res);
        return;
    }
}

let transport: Transport;
let appEth: AppEth;
const MsgSend = () => {
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    const [denom, setDenom] = useState('aphoton');
    const [memo, setMemo] = useState('');
    return (
        <VStack>
            <VStack
                p={10}
                alignItems="flex-start"
                border="1px"
                h="full"
                borderRadius={25}
            >
                <Heading size="md">Msg Send</Heading>
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
                                        executeMsgSend(
                                            dest,
                                            amount,
                                            denom,
                                            memo
                                        );
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

            {/* IBC */}

            <VStack
                p={10}
                alignItems="flex-start"
                border="1px"
                h="full"
                borderRadius={25}
            >
                <Heading size="md">IBC</Heading>
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
                                        executeIBC();
                                    }}
                                >
                                    IBC <FiSend style={{ marginLeft: '5px' }} />
                                </Button>
                            </FormControl>
                        </Center>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </VStack>
    );
};

export default MsgSend;
