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
import { Divider, Select } from '@chakra-ui/react';
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
import { createTxMsgVote } from '@tharsis/transactions';

export async function executeMsgVote(
    proposalId: string,
    option: string,
    memo: string,
    feeAmount: string,
    feeDenom: string,
    feeGas: string
) {
    if (proposalId == '') {
        fireError('Type error', 'Invalid proposalId!');
        return false;
    }

    if (Number(proposalId) === NaN) {
        fireError('Type error', 'Invalid proposalId!');
        return false;
    }

    if (option == '') {
        fireError('Type error', 'Invalid option!');
        return false;
    }

    if (Number(option) === NaN) {
        fireError('Type error', 'Invalid option!');
        return false;
    }

    if (feeAmount == '') {
        feeAmount = BaseFee;
    }
    if (Number(feeAmount) === NaN) {
        fireError('Type error', 'Invalid feeAmount!');
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

    const sender = await getAccount();
    if (sender == null) {
        return;
    }

    const fee = {
        amount: feeAmount,
        denom: feeDenom,
        gas: feeGas,
    };

    let res = await createTxMsgVote(chain, sender, fee, memo, {
        proposalId: Number(proposalId),
        option: Number(option),
    });

    return signCosmosAndBroadcastWithMetamask(chain, sender, res);
}

const Voting = () => {
    const [proposalId, setProposalId] = useState('1');
    const [option, setOption] = useState('1');

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
                    <>Vote on proposal</>
                </Heading>
                <Divider />
                <h2>Params:</h2>
                <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="destSendControl">
                            <FormLabel id="destSend">Proposal ID</FormLabel>
                            <Input
                                placeholder="1"
                                type="text"
                                value={proposalId}
                                onChange={(e) => setProposalId(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={[1, 2]}>
                        <FormControl id="amountSendControl">
                            <FormLabel id="amountSend">Option:</FormLabel>
                            <Select
                                value={option}
                                onChange={(e) => setOption(e.target.value)}
                            >
                                <option value="1">Yes</option>
                                <option value="2">Abstain</option>
                                <option value="3">No</option>
                                <option value="4">No with veto</option>
                            </Select>
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
                                        executeMsgVote(
                                            proposalId,
                                            option,
                                            memo,
                                            feeAmount,
                                            feeDenom,
                                            feeGas
                                        );
                                    }}
                                >
                                    Vote{' '}
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

export default Voting;
