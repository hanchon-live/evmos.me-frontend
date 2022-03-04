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
    HStack,
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
import { getWalletEth, isKeplr, isMetamask } from '../utils/db';

import { broadcastEndpoint } from '@tharsis/provider';
import {
    createTxRawEIP712,
    signatureToWeb3Extension,
} from '@tharsis/transactions';
import { evmosToEth } from '@tharsis/address-converter';
import { getAccount } from '../utils/blockchain/account';
import { BaseFee, chain } from '../utils/blockchain/chain';
import {
    broadcastCosmosTransaction,
    broadcastEIP712Transaction,
} from '../utils/blockchain/broadcast';
import { createTxIBCMsgTransfer } from '@tharsis/transactions';
import { signCosmosAndBroadcastWithMetamask } from '../utils/signers/metamask';

async function autocompleteOsmosis(port, channel, number, height, timestamp) {
    try {
        let osmosis = await fetch('https://rpc-osmosis.keplr.app/status');
        let values = await osmosis.json();
        var heightOsmosis = values.result.sync_info.latest_block_height;
    } catch (e) {
        fireError('Osmosis', 'Error getting latest block height!');
        return;
    }
    port('transfer');
    channel('channel-0');
    number('1');
    height(Number(heightOsmosis) + 1000);
    let offset = Number(Date.now().toString()) + 10 * 60000;
    console.log(Date.now().toString());
    console.log(offset);
    timestamp(`${offset}000000`);
    fireSuccess('Osmosis', 'Osmosis data fully loaded!');
    return;
}

export async function executeIBCTransfer(
    sourcePort: string,
    sourceChannel: string,
    amount: string,
    denom: string,
    receiver: string,
    revisionNumber: string,
    revisionHeight: string,
    timeoutTimestamp: string,
    memo: string,
    feeAmount: string,
    feeDenom: string,
    feeGas: string
) {
    if (receiver == '') {
        fireError('Type error', 'Invalid receiver!');
        return false;
    }

    if (sourceChannel == '') {
        fireError('Type error', 'Invalid sourceChannel!');
        return false;
    }

    if (sourcePort == '') {
        fireError('Type error', 'Invalid sourcePort!');
        return false;
    }

    if (amount == '') {
        fireError('Type error', 'Invalid amount!');
        return false;
    }

    if (denom == '') {
        denom = 'aevmos';
    }

    if (feeAmount == '') {
        feeAmount = BaseFee;
    }
    if (Number(feeAmount) === NaN) {
        fireError('Type error', 'Invalid feeAmount!');
        return false;
    }
    if (Number(revisionNumber) === NaN) {
        fireError('Type error', 'Invalid revisionNumber!');
        return false;
    }
    if (Number(revisionHeight) === NaN) {
        fireError('Type error', 'Invalid revisionHeight!');
        return false;
    }

    if (feeDenom == '') {
        feeDenom = 'aevmos';
    }

    if (feeGas == '') {
        feeGas = '200000';
    }
    if (Number(feeGas) === NaN) {
        fireError('Type error', 'Invalid feeGas!');
        return false;
    }
    if (sourceChannel === 'channel-0') {
        if (receiver.split('osmo1').length != 2) {
            fireError(
                'IBC',
                'Make sure you are using the osmosis address as receiver!'
            );
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

    const fee = {
        amount: feeAmount,
        denom: feeDenom,
        gas: feeGas,
    };

    let res = await createTxIBCMsgTransfer(chain, sender, fee, memo, {
        sourcePort,
        sourceChannel,
        // Token
        amount,
        denom,
        // Addresses
        receiver,
        // Timeout
        revisionNumber: parseInt(revisionNumber, 10),
        revisionHeight: parseInt(revisionHeight, 10),
        timeoutTimestamp,
    });

    return signCosmosAndBroadcastWithMetamask(chain, sender, res);
}

let transport: Transport;
let appEth: AppEth;
const IBCTransfer = () => {
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [denom, setDenom] = useState('');

    const [sourcePort, setSourcePort] = useState('');
    const [sourceChannel, setSourceChannel] = useState('');

    const [revisionNumber, setRevisionNumber] = useState('');
    const [revisionHeight, setRevisionHeight] = useState('');
    const [timeoutTimestamp, setTimeoutTimestamp] = useState('');

    const [memo, setMemo] = useState('');
    const [feeAmount, setFeeAmount] = useState('');
    const [feeDenom, setFeeDenom] = useState('');
    const [feeGas, setFeeGas] = useState('');

    return (
        <VStack>
            <VStack
                p={10}
                alignItems="flex-start"
                border="1px"
                h="full"
                borderRadius={25}
            >
                <Heading size="md">
                    <>IBC Transfer</>
                    <Button
                        mt={2}
                        w="full"
                        bg="teal.300"
                        color="white"
                        onClick={() => {
                            autocompleteOsmosis(
                                setSourcePort,
                                setSourceChannel,
                                setRevisionNumber,
                                setRevisionHeight,
                                setTimeoutTimestamp
                            );
                        }}
                    >
                        Complete for Osmosis
                    </Button>
                </Heading>
                <Divider />
                <h2>Params:</h2>
                <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="destSendControl">
                            <FormLabel id="destSend">Receiver</FormLabel>
                            <Input
                                placeholder="osmo1..."
                                type="text"
                                value={receiver}
                                onChange={(e) => setReceiver(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="amountSendControl">
                            <FormLabel id="amountSend">Amount</FormLabel>
                            <Input
                                placeholder="1000000000000000000"
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                            ></Input>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSendControl">
                            <FormLabel id="denomSend">Coin(Optional)</FormLabel>
                            <Input
                                placeholder="aevmos"
                                type="text"
                                onChange={(e) => setDenom(e.target.value)}
                            ></Input>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSend1Control">
                            <FormLabel id="denomSend1">Source Port</FormLabel>
                            <Input
                                placeholder="transfer"
                                type="text"
                                value={sourcePort}
                                onChange={(e) => setSourcePort(e.target.value)}
                            ></Input>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSend2Control">
                            <FormLabel id="denomSend2">
                                Source Channel
                            </FormLabel>
                            <Input
                                placeholder="channel-0"
                                type="text"
                                value={sourceChannel}
                                onChange={(e) =>
                                    setSourceChannel(e.target.value)
                                }
                            ></Input>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSend3Control">
                            <FormLabel id="denomSend3">
                                Revision Number
                            </FormLabel>
                            <Input
                                placeholder="1"
                                type="text"
                                value={revisionNumber}
                                onChange={(e) =>
                                    setRevisionNumber(e.target.value)
                                }
                            ></Input>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSend4Control">
                            <FormLabel id="denomSend4">
                                Revision Height
                            </FormLabel>
                            <Input
                                placeholder="3500000"
                                type="text"
                                value={revisionHeight}
                                onChange={(e) =>
                                    setRevisionHeight(e.target.value)
                                }
                            ></Input>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="denomSend4Control">
                            <FormLabel id="denomSend4">
                                Timeout Timestamp
                            </FormLabel>
                            <Input
                                placeholder="1646273298886156858"
                                type="text"
                                value={timeoutTimestamp}
                                onChange={(e) =>
                                    setTimeoutTimestamp(e.target.value)
                                }
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

                    <h1>Fees:</h1>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="memoSendControl">
                            <FormLabel id="memoSend">
                                Fee Amount(optional)
                            </FormLabel>
                            <Input
                                placeholder={BaseFee}
                                type="text"
                                onChange={(e) => setFeeAmount(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="memoSendControl">
                            <FormLabel id="memoSend">
                                Fee Denom(optional)
                            </FormLabel>
                            <Input
                                placeholder="aevmos"
                                type="text"
                                onChange={(e) => setFeeDenom(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="memoSendControl">
                            <FormLabel id="memoSend">
                                Fee Gas(optional)
                            </FormLabel>
                            <Input
                                placeholder="200000"
                                type="text"
                                onChange={(e) => setFeeGas(e.target.value)}
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
                                        executeIBCTransfer(
                                            sourcePort,
                                            sourceChannel,
                                            amount,
                                            denom,
                                            receiver,
                                            revisionNumber,
                                            revisionHeight,
                                            timeoutTimestamp,
                                            memo,
                                            feeAmount,
                                            feeDenom,
                                            feeGas
                                        );
                                    }}
                                >
                                    IBC Transfer{' '}
                                    <FiSend style={{ marginLeft: '5px' }} />
                                </Button>
                            </FormControl>
                        </Center>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </VStack>
    );
};

export default IBCTransfer;
