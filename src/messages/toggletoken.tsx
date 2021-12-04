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
    callToggleToken,
} from '../utils/backend';
import { getWalletEth, getWalletEvmos } from '../utils/db';

export async function executeToggleToken(
    token: string,
    fee: string,
    gasLimit: string
) {
    const myWallet = getWalletEvmos();
    if (myWallet === null) {
        fireError('Toggle Token', 'Invalid wallet!');
        return false;
    }
    const myWalletEth = getWalletEth();
    console.log(myWalletEth);
    if (myWalletEth === null) {
        fireError('Toggle Token', 'Invalid wallet!');
        return false;
    }
    let res = await callToggleToken(token, fee, gasLimit);

    let signed = await signTransaction(res);
    if (signed === null || signed === undefined) {
        return fireError('Toggle Token', 'Could not sign the message');
    }
    let result = await broadcast(
        signed.authBytes,
        signed.bodyBytes,
        signed.signature
    );
    if (result.res === true) {
        return fireSuccess(
            'Toggle Token',
            `Transaction sent with hash: ${result.msg}`
        );
    }
    return fireError(
        'Toggle Token',
        `Error sending the transaction: ${result.msg}`
    );
}

const ToggleToken = () => {
    const [token, setToken] = useState('');
    const [fee, setFee] = useState('1000');
    const [gasLimit, setGasLimit] = useState('10000000');
    return (
        <VStack p={10} alignItems="flex-start" border="1px" borderRadius={25}>
            <Heading size="md">Toggle Token</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">
                            Token (Contract Address/Base denom)
                        </FormLabel>
                        <Input
                            placeholder="0x../intrarealyer-..."
                            type="text"
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gascontrol">
                        <FormLabel id="gaslabel">Gas Limit</FormLabel>
                        <Input
                            placeholder="10000000"
                            type="number"
                            onChange={(e) => setGasLimit(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gaspricecontrol">
                        <FormLabel id="gaspricelabel">Fee</FormLabel>
                        <Input
                            placeholder="1000"
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
                                    executeToggleToken(token, fee, gasLimit);
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

export default ToggleToken;
