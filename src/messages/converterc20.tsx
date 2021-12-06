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
import {
    signTransaction,
    callSendAphoton,
    broadcast,
    callProposalRegisterErc20,
    callConvertErc20,
} from '../utils/backend';
import { getWalletEth, getWalletEvmos } from '../utils/db';

export async function executeConvertERC20(
    contract: string,
    amount: string,
    // denom: string,
    fee: string,
    gasLimit: string
) {
    if (contract.toLowerCase().split('0x').length != 2) {
        fireError('Convert ERC20', 'Invalid Contract!');
        return false;
    }

    if (Number(amount) === NaN) {
        fireError('Convert ERC20', 'Invalid amount!');
        return false;
    }
    const myWallet = getWalletEvmos();
    if (myWallet === null) {
        fireError('Convert ERC20', 'Invalid wallet!');
        return false;
    }
    const myWalletEth = getWalletEth();
    console.log(myWalletEth);
    if (myWalletEth === null) {
        fireError('Convert ERC20', 'Invalid wallet!');
        return false;
    }
    let res = await callConvertErc20(
        contract,
        amount,
        myWallet,
        myWalletEth,
        fee,
        gasLimit
    );

    let signed = await signTransaction(res);
    if (signed === null || signed === undefined) {
        return fireError('Convert ERC20', 'Could not sign the message');
    }
    let result = await broadcast(
        signed.authBytes,
        signed.bodyBytes,
        signed.signature
    );
    if (result.res === true) {
        return fireSuccess(
            'Convert ERC20',
            `Transaction sent with hash: ${result.msg}`
        );
    }
    return fireError(
        'Convert ERC20',
        `Error sending the transaction: ${result.msg}`
    );
}

const ConvertERC20 = () => {
    const [contract, setContract] = useState('');
    const [amount, setAmount] = useState('1');
    const [denom, setDenom] = useState('aphoton');
    const [fee, setFee] = useState('1000');
    // const [gasLimit, setGasLimit] = useState('2100000000000');
    const [gasLimit, setGasLimit] = useState('1000000');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Convert ERC20</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Contract address</FormLabel>
                        <Input
                            placeholder="0x.."
                            type="text"
                            onChange={(e) => setContract(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl">
                        <FormLabel id="amountSend">Amount</FormLabel>
                        <Input
                            placeholder="1"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gascontrol">
                        <FormLabel id="gaslabel">Gas Limit</FormLabel>
                        <Input
                            placeholder="1000000"
                            type="number"
                            onChange={(e) => setGasLimit(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gaspricecontrol">
                        <FormLabel id="gaspricelabel">Fee</FormLabel>
                        <Input
                            value="1000"
                            type="number"
                            onChange={(e) => setFee(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]} h="full">
                    <Center w="full">
                        <FormControl id="buttonRegisterERC20">
                            <Button
                                w="full"
                                bg="teal.300"
                                color="white"
                                onClick={() => {
                                    executeConvertERC20(
                                        contract,
                                        amount,
                                        // denom,
                                        fee,
                                        gasLimit
                                    );
                                }}
                            >
                                Convert ERC20{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default ConvertERC20;
