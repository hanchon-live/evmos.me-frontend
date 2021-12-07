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
} from '../utils/backend';

export async function executeRegisterERC20(
    contract: string,
    fee: string,
    gasLimit: string
) {
    if (fee == '') {
        fee = '1000';
    }
    if (gasLimit == '') {
        gasLimit = '1000000';
    }

    if (contract.split('0x').length != 2) {
        fireError('Register ERC20', 'Invalid Contract!');
        return false;
    }

    let res = await callProposalRegisterErc20(contract, fee, gasLimit);

    let signed = await signTransaction(res);
    if (signed === null || signed === undefined) {
        return fireError('Register ERC20', 'Could not sign the message');
    }
    let result = await broadcast(
        signed.authBytes,
        signed.bodyBytes,
        signed.signature
    );
    if (result.res === true) {
        return fireSuccess(
            'Register ERC20',
            `Transaction sent with hash: ${result.msg}`
        );
    }
    return fireError(
        'Register ERC20',
        `Error sending the transaction: ${result.msg}`
    );
}

const RegisterERC20 = () => {
    const [contract, setContract] = useState('');
    const [fee, setFee] = useState('1000');
    const [gasLimit, setGasLimit] = useState('10000000');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Register ERC20</Heading>
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

                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gascontrol">
                        <FormLabel id="gaslabel">GasLimit(Optional)</FormLabel>
                        <Input
                            placeholder="10000000"
                            type="number"
                            onChange={(e) => setGasLimit(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 1]}>
                    <FormControl id="gaspricecontrol">
                        <FormLabel id="gaspricelabel">Fee(Optional)</FormLabel>
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
                                    executeRegisterERC20(
                                        contract,
                                        fee,
                                        gasLimit
                                    );
                                }}
                            >
                                Register ERC20{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default RegisterERC20;
