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
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import {
    signTransaction,
    delegateAphoton,
    broadcast,
    undelegateAphoton,
} from '../utils/backend';

async function execute(dest: string, amount: string) {
    if (dest.split('evmosvaloper1').length != 2) {
        fireError('Undelegate Aphotons', 'Invalid destination!');
        return false;
    }

    if (Number(amount) === NaN) {
        fireError('Undelegate Aphotons', 'Invalid amount!');
        return false;
    }
    let res = await undelegateAphoton(dest, amount);
    let signed = await signTransaction(res);
    if (signed === null || signed === undefined) {
        return fireError('Undelegate Aphotons', 'Could not sign the message');
    }
    let result = await broadcast(
        signed.authBytes,
        signed.bodyBytes,
        signed.signature
    );
    if (result.res === true) {
        return fireSuccess(
            'Undelegate Aphotons',
            `Transaction sent with hash: ${result.msg}`
        );
    }
    return fireError(
        'Undelegate Aphotons',
        `Error sending the transaction: ${result.msg}`
    );
}

const UndelegateAphotons = () => {
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Undelegate aphotons</Heading>
            <Divider />
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={2}>
                    <FormControl id="destUndelegateControl">
                        <FormLabel id="destUndelegate">Destination</FormLabel>
                        <Input
                            placeholder="evmosvaloper1t703ccll8shpkhwnvmtu5nzrvcaw52u8an2708"
                            type="text"
                            onChange={(e) => setDest(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl id="amountUndelegateControl">
                        <FormLabel id="amountUndelegate">
                            Amount (Aphoton)
                        </FormLabel>
                        <Input
                            placeholder="10000000"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2} h="full">
                    <Center h="full">
                        <FormControl id="buttonUndelegateControl">
                            <Button
                                w="full"
                                bg="teal.300"
                                color="white"
                                onClick={() => {
                                    execute(dest, amount);
                                }}
                            >
                                Undelegate Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                        </FormControl>
                    </Center>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default UndelegateAphotons;
