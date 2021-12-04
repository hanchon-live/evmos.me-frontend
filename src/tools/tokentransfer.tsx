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
import { getWalletEth, isMetamask } from '../utils/db';

export async function executeERC20Transfer(
    contract: string,
    dest: string,
    amount: string
) {
    const wallet = getWalletEth();
    if (wallet == null) {
        fireError('Transfer', 'Invalid user wallet!');
        return false;
    }

    if (Number(amount) === NaN) {
        fireError('Transfer', 'Invalid amount!');
        return false;
    }
    let tx = await createERC20Transfer(wallet, dest, contract, amount);
    if (isMetamask()) {
        try {
            let res = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx.tx],
            });
            return fireSuccess(
                'Transfer',
                `Transaction sent with hash: ${res}`
            );
        } catch (e) {
            console.error(e);
            fireError('Transfer', 'Metamask error on submitting transaction');
        }
    } else {
        fireError(
            'Transfer',
            'ERC20 token transfers are only available on metamask!'
        );
        return false;
    }
}

const TransferToken = () => {
    const [contract, setContract] = useState('');
    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState('');
    return (
        <VStack p={10} alignItems="flex-start" border="1px" borderRadius={25}>
            <Heading size="md">Transfer ERC20 Token</Heading>
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
                        <FormLabel id="destSend2">
                            Transfer to: (wallet address)
                        </FormLabel>
                        <Input
                            placeholder="0x.. or evmos1..."
                            type="text"
                            onChange={(e) => {
                                if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('0x').length == 2
                                ) {
                                    setDestination(e.target.value);
                                } else if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('evmos1').length == 2
                                ) {
                                    setDestination(evmosToEth(e.target.value));
                                } else {
                                    setDestination('');
                                }
                            }}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Amount:</FormLabel>
                        <Input
                            placeholder="1"
                            type="number"
                            onChange={(e) => {
                                setAmount(e.target.value);
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
                                    executeERC20Transfer(
                                        contract,
                                        destination,
                                        amount
                                    );
                                }}
                            >
                                Transfer tokens{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default TransferToken;
