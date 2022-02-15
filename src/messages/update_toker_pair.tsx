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
import { ethToEthermint } from '@hanchon/ethermint-address-converter';
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
    callUpdateTokenPair,
} from '../utils/backend';
import { getWalletEth, getWalletEvmos } from '../utils/db';

export async function executeUpdateTokenPair(
    token: string,
    newToken: string,
    fee: string,
    gasLimit: string,

    proposalTitle: string,
    proposalDescription: string
) {
    if (proposalTitle == '' || proposalDescription == '') {
        fireError(
            'Proposal error',
            'Proposal title and description must be filled'
        );
    }

    if (fee == '') {
        fee = '10000';
    }
    if (gasLimit == '') {
        gasLimit = '1000000';
    }
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
    let res = await callUpdateTokenPair(
        token,
        newToken,
        fee,
        gasLimit,
        proposalTitle,
        proposalDescription
    );

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

const UpdateTokenPair = () => {
    const [token, setToken] = useState('');
    const [newToken, setNewToken] = useState('');
    const [fee, setFee] = useState('10000');
    const [gasLimit, setGasLimit] = useState('10000000');

    const [proposalTitle, setProposalTitle] = useState('');
    const [proposalDescription, setProposalDescription] = useState('');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Update Token Pair</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">
                            Token (Contract Address)
                        </FormLabel>
                        <Input
                            placeholder="0x.."
                            type="text"
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl2">
                        <FormLabel id="destSend2">
                            New Token (Contract Address)
                        </FormLabel>
                        <Input
                            placeholder="0x.."
                            type="text"
                            onChange={(e) => setNewToken(e.target.value)}
                        />
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 1]}>
                    <FormControl id="ptitleform">
                        <FormLabel id="ptitle">Title</FormLabel>
                        <Input
                            placeholder="Proposal Title"
                            type="text"
                            onChange={(e) => setProposalTitle(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={[1, 1]}>
                    <FormControl id="pdescpform">
                        <FormLabel id="pdesc">Description</FormLabel>
                        <Input
                            placeholder="Proposal Description"
                            type="text"
                            onChange={(e) =>
                                setProposalDescription(e.target.value)
                            }
                        ></Input>
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
                            placeholder="10000"
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
                                    executeUpdateTokenPair(
                                        token,
                                        newToken,
                                        fee,
                                        gasLimit,
                                        proposalTitle,
                                        proposalDescription
                                    );
                                }}
                            >
                                Update Token Pair{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default UpdateTokenPair;
