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
    callProposalRegisterCoin,
} from '../utils/backend';

export async function executeRegisterCoin(
    description: string,
    base: string,
    display: string,
    name: string,
    symbol: string,
    dnName: string,
    dnExponent: string,
    dnAlias: string,
    dn2Name: string,
    dn2Exponent: string,

    fee: string,
    gasLimit: string
) {
    // if (contract.split('0x').length != 2) {
    //     fireError('Register ERC20', 'Invalid Contract!');
    //     return false;
    // }

    // if (Number(amount) === NaN) {
    //     fireError('Register ERC20', 'Invalid amount!');
    //     return false;
    // }
    let res = await callProposalRegisterCoin(
        description,
        base,
        display,
        name,
        symbol,
        dnName,
        dnExponent,
        dnAlias,
        dn2Name,
        dn2Exponent,
        fee,
        gasLimit
    );

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

const RegisterCoin = () => {
    const [description, setDescription] = useState('');
    const [base, setBase] = useState('');
    const [display, setDisplay] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [dnName, setDnName] = useState('');
    const [dnExponent, setDnExponent] = useState('');
    const [dnAlias, setDnAlias] = useState('');
    const [dn2Name, setDn2Name] = useState('');
    const [dn2Exponent, setDn2Exponent] = useState('');

    const [fee, setFee] = useState('1000');
    const [gasLimit, setGasLimit] = useState('1000000');

    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Register Coin</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl1">
                        <FormLabel id="destSend1">Denomination base</FormLabel>
                        <Input
                            placeholder="aphoton"
                            type="text"
                            onChange={(e) => setBase(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl21">
                        <FormLabel id="destSend1">
                            Denomination description
                        </FormLabel>
                        <Input
                            placeholder="this is the base coin for evmos"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl2">
                        <FormLabel id="destSend2">
                            Denomination display
                        </FormLabel>
                        <Input
                            placeholder="photon"
                            type="text"
                            onChange={(e) => setDisplay(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl3">
                        <FormLabel id="destSend3">Denomination name</FormLabel>
                        <Input
                            placeholder="Photon"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl4">
                        <FormLabel id="destSend4">
                            Denomination symbol
                        </FormLabel>
                        <Input
                            placeholder="PHOTON"
                            type="text"
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <Heading size="sm">Denomination unit 1</Heading>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl5">
                        <FormLabel id="destSend5">Denomination name</FormLabel>
                        <Input
                            placeholder="aphoton"
                            type="text"
                            onChange={(e) => setDnName(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl6">
                        <FormLabel id="destSend6">
                            Denomination exponent
                        </FormLabel>
                        <Input
                            placeholder="0"
                            type="text"
                            onChange={(e) => setDnExponent(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl7">
                        <FormLabel id="destSend7">Denomination alias</FormLabel>
                        <Input
                            placeholder="atto photon"
                            type="text"
                            onChange={(e) => setDnAlias(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <Heading size="sm">Denomination unit 2</Heading>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl8">
                        <FormLabel id="destSend8">Denomination name</FormLabel>
                        <Input
                            placeholder="photon"
                            type="text"
                            onChange={(e) => setDn2Name(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl9">
                        <FormLabel id="destSend9">
                            Denomination exponent
                        </FormLabel>
                        <Input
                            placeholder="18"
                            type="text"
                            onChange={(e) => setDn2Exponent(e.target.value)}
                        />
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
                                    executeRegisterCoin(
                                        description,
                                        base,
                                        display,
                                        name,
                                        symbol,
                                        dnName,
                                        dnExponent,
                                        dnAlias,
                                        dn2Name,
                                        dn2Exponent,
                                        fee,
                                        gasLimit
                                    );
                                }}
                            >
                                Register Coin{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default RegisterCoin;
