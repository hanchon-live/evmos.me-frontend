import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

import { Input } from '@chakra-ui/input';
import {
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
import { signTransaction, callSendAphoton, broadcast } from '../utils/backend';

export async function executeSendAphoton(dest: string, amount: string) {
    console.log(dest);
    if (dest.split('evmos').length != 2) {
        if (dest.split('0x').length == 2) {
            dest = ethToEvmos(dest);
        } else {
            fireError('Send Aphotons', 'Invalid destination!');
            return false;
        }
    }
    if (Number(amount) === NaN) {
        fireError('Send Aphotons', 'Invalid amount!');
        return false;
    }
    let res = await callSendAphoton(dest, amount);
    let signed = await signTransaction(res);
    if (signed === null || signed === undefined) {
        return fireError('Send Aphotons', 'Could not sign the message');
    }
    let result = await broadcast(
        signed.authBytes,
        signed.bodyBytes,
        signed.signature
    );
    if (result.res === true) {
        return fireSuccess(
            'Send Aphotons',
            `Transaction sent with hash: ${result.msg}`
        );
    }
    return fireError(
        'Send Aphotons',
        `Error sending the transaction: ${result.msg}`
    );
}

const SendAphotons = () => {
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            bg="teal.700"
            border="1px"
            borderRadius={25}
        >
            <Heading size="md">Send aphotons</Heading>
            <Divider />
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={2}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Destination</FormLabel>
                        <Input
                            placeholder="0x752e67bd2e22c3d327415d9dbc5f671214573642"
                            type="text"
                            onChange={(e) => setDest(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl id="amountSendControl">
                        <FormLabel id="amountSend">Amount (Aphoton)</FormLabel>
                        <Input
                            placeholder="10"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1} h="full">
                    <Center h="full">
                        <FormControl id="buttonSendControl">
                            <FormLabel id="buttonSend">&nbsp;</FormLabel>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    executeSendAphoton(dest, amount);
                                }}
                            >
                                Send Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default SendAphotons;
