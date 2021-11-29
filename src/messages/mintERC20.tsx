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
    callProposalRegisterErc20,
    callMintErc20,
} from '../utils/backend';
import { isMetamask } from '../utils/db';

export async function executeMintERC20(
    contract: string,
    destination: string,
    amount: string
) {
    if (contract.split('0x').length != 2) {
        fireError('Register ERC20', 'Invalid Contract!');
        return false;
    }

    if (destination.split('evmos1').length == 2) {
        destination = evmosToEth(destination);
    } else if (destination.split('0x').length != 2) {
        fireError('Register ERC20', 'Invalid Contract!');
        return false;
    }

    if (Number(amount) === NaN) {
        fireError('Register ERC20', 'Invalid amount!');
        return false;
    }
    let tx = await callMintErc20(contract, destination, amount);

    if (isMetamask()) {
        try {
            let res = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx.tx],
            });
            return fireSuccess(
                'MintERC20',
                `Transaction sent with hash: ${res}`
            );
        } catch (e) {
            console.error(e);
            fireError('MintERC20', 'Metamask error on submitting transaction');
        }
    } else {
        fireError('MintERC20', 'ERC20 minting is only available on metamask!');
        return false;
    }
}

const MintERC20 = () => {
    const [contract, setContract] = useState('');
    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState('2000000000000000000');
    // const [denom, setDenom] = useState('aphoton');
    // const [fee, setFee] = useState('2');
    // const [gasLimit, setGasLimit] = useState('2100000000000');
    return (
        <VStack p={10} alignItems="flex-start" border="1px" borderRadius={25}>
            <Heading size="md">Mint ERC20</Heading>
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
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Destination address</FormLabel>
                        <Input
                            placeholder="0x../evmos1..."
                            type="text"
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl">
                        <FormLabel id="amountSend">Amount</FormLabel>
                        <Input
                            placeholder="1000"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>

                {/* <GridItem colSpan={[1, 1]}>
                    <FormControl id="denomSendControl">
                        <FormLabel id="denomSend">Coin</FormLabel>
                        <Input
                            value="aphoton"
                            type="text"
                            onChange={(e) => setDenom(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem> */}

                {/* <GridItem colSpan={[1, 1]}>
                    <FormControl id="gascontrol">
                        <FormLabel id="gaslabel">Gas Limit</FormLabel>
                        <Input
                            placeholder="2100000000000"
                            type="number"
                            onChange={(e) => setGasLimit(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gaspricecontrol">
                        <FormLabel id="gaspricelabel">Fee</FormLabel>
                        <Input
                            value="20"
                            type="number"
                            onChange={(e) => setFee(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem> */}

                <GridItem colSpan={[1, 2]} h="full">
                    <Center w="full">
                        <FormControl id="buttonRegisterERC20">
                            <Button
                                w="full"
                                bg="teal.300"
                                color="white"
                                onClick={() => {
                                    executeMintERC20(
                                        contract,
                                        destination,
                                        amount
                                    );
                                }}
                            >
                                Mint Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default MintERC20;
