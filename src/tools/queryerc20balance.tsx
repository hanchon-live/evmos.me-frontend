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
import { ethToEvmos, evmosToEth } from '@hanchon/ethermint-address-converter';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import {
    signTransaction,
    callSendAphoton,
    broadcast,
    callGetERC20Balance,
    createERC20Transfer,
} from '../utils/backend';
import { isMetamask } from '../utils/db';

export async function executeGetERC20Balance(
    contract: string,
    wallet: string,
    setName: any,
    setSymbol: any,
    setBalance: any,
    setDecimals: any
) {
    if (contract.split('0x').length != 2 || wallet.split('0x').length != 2) {
        fireError('Get ERC20 Balance', 'Invalid inputs!');
        return false;
    }

    let res = await callGetERC20Balance(contract, wallet);
    if (res.balances.length > 0) {
        setName(res.balances[0].name);
        setSymbol(res.balances[0].symbol);
        setBalance(res.balances[0].balance);
        setDecimals(res.balances[0].decimals);
    }

    return fireSuccess('Get ERC20 Balance', `Query success!`);
}
const QueryERC20Balance = () => {
    const [contract, setContract] = useState('');
    const [wallet, setWallet] = useState('');
    const [decimals, setDecimals] = useState('');
    const [balance, setBalance] = useState('');
    const [symbol, setSymbol] = useState('');
    const [name, setName] = useState('');
    return (
        <VStack p={10} alignItems="flex-start" border="1px" borderRadius={25}>
            <Heading size="md">Query ERC20 Balance</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Contract Address</FormLabel>
                        <Input
                            placeholder="0x.."
                            type="text"
                            onChange={(e) => {
                                setContract(e.target.value);
                            }}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl2">
                        <FormLabel id="destSend2">Wallet Address</FormLabel>
                        <Input
                            placeholder="0x.. or evmos1..."
                            type="text"
                            onChange={(e) => {
                                if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('0x').length == 2
                                ) {
                                    setWallet(e.target.value);
                                } else if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('evmos1').length == 2
                                ) {
                                    setWallet(evmosToEth(e.target.value));
                                } else {
                                    setWallet('');
                                }
                            }}
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
                                    executeGetERC20Balance(
                                        contract,
                                        wallet,
                                        setName,
                                        setSymbol,
                                        setBalance,
                                        setDecimals
                                    );
                                }}
                            >
                                Query Balances{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl5">
                        <FormLabel id="amountSend5">Name</FormLabel>
                        <Input value={name} type="text"></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl4">
                        <FormLabel id="amountSend4">Symbol</FormLabel>
                        <Input value={symbol} type="text"></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl3">
                        <FormLabel id="amountSend3">Balance</FormLabel>
                        <Input value={balance} type="text"></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl2">
                        <FormLabel id="amountSend2">Decimals</FormLabel>
                        <Input value={decimals} type="text"></Input>
                    </FormControl>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default QueryERC20Balance;
