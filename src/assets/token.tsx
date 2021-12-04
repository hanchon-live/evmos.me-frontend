import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import {
    Box,
    Center,
    Circle,
    Grid,
    GridItem,
    Heading,
    Text,
} from '@chakra-ui/layout';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal';
import { HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import { createERC20Transfer } from '../utils/backend';
import { getWalletEth, isMetamask } from '../utils/db';

export async function executeERC20Transfer(
    contract: string,
    dest: string,
    amount: string
) {
    if (Number(amount) === NaN) {
        fireError('Transfer', 'Invalid amount!');
        return false;
    }
    const walletEth = getWalletEth();
    if (walletEth == null) {
        fireError('Transfer', 'Wallet not set!');
        return false;
    }
    let tx = await createERC20Transfer(walletEth, dest, contract, amount);
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

const Token = ({ Icon, name, balance, address, symbol, transfer }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dest, setDest] = useState('');
    const [amount, setAmount] = useState('');

    return (
        <>
            <GridItem colSpan={1}>
                <Center>
                    <Box
                        minW={[200, 300]}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="lg"
                        m={3}
                        bgGradient="linear(to-br, teal.500, teal.600)"
                    >
                        <Grid
                            templateRows={
                                address === undefined
                                    ? 'repeat(3, 5em)'
                                    : 'repeat(4, 5em)'
                            }
                            templateColumns="repeat(2)"
                        >
                            <GridItem rowSpan={1} colSpan={1}>
                                <Center h="full" pt={10}>
                                    <Circle
                                        bg="teal.900"
                                        h="75px"
                                        w="75px"
                                        boxShadow="base"
                                    >
                                        <Circle bg="teal.700" h="60px" w="60px">
                                            <Icon size="50px" />
                                        </Circle>
                                    </Circle>
                                </Center>
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                                justifyItems="center"
                            >
                                <Center h="full" pt={10}>
                                    <Box
                                        color="gray.200"
                                        fontWeight="bold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        textAlign="center"
                                    >
                                        &bull; Token name &bull;
                                        <Text
                                            fontWeight="bold"
                                            fontSize="lg"
                                            color="white"
                                        >
                                            {name}
                                        </Text>
                                    </Box>
                                </Center>
                            </GridItem>
                            <GridItem colSpan={2} justifyItems="center">
                                <Center h="full">
                                    <Box
                                        color="gray.200"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        textAlign="center"
                                        pt={5}
                                    >
                                        &bull; Balance &bull;
                                        <Text
                                            px={3}
                                            fontWeight="bold"
                                            fontSize="lg"
                                            color="white"
                                            style={{ overflowWrap: 'anywhere' }}
                                        >
                                            {balance}
                                        </Text>
                                        <Text>
                                            {symbol !== undefined
                                                ? symbol
                                                : name}
                                        </Text>
                                    </Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                display={
                                    address === undefined ? 'none' : 'block'
                                }
                                rowSpan={1}
                                colSpan={2}
                                justifyItems="center"
                            >
                                <Center h="auto">
                                    <Box
                                        color="gray.200"
                                        fontWeight="bold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        textAlign="center"
                                        px={3}
                                        pt={3}
                                    >
                                        &bull; Address &bull;
                                        <Text
                                            fontWeight="bold"
                                            fontSize="md"
                                            color="white"
                                            style={{ overflowWrap: 'anywhere' }}
                                        >
                                            {address}
                                        </Text>
                                    </Box>
                                </Center>
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={2}
                                justifyItems="center"
                            >
                                <Center alignItems="center" h="full">
                                    <Button
                                        colorScheme="teal"
                                        variant="solid"
                                        _hover={{
                                            border: '1px',
                                            backgroundColor: 'teal.400',
                                        }}
                                        onClick={onOpen}
                                    >
                                        Transfer &bull; <ArrowRightIcon />
                                    </Button>
                                </Center>
                            </GridItem>
                        </Grid>
                    </Box>
                </Center>
            </GridItem>

            <Modal
                // initialFocusRef={initialRef}
                // finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Send {name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* <Heading>
                            <Text>Using wallet {generalState.</Text>
                        </Heading> */}
                        <FormControl>
                            <FormLabel>Destination Wallet:</FormLabel>
                            <Input
                                variant="primary"
                                placeholder="0x... / evmos1..."
                                onChange={(e) => setDest(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Amount ({name})</FormLabel>
                            <Input
                                variant="primary"
                                placeholder="1000"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    if (transfer == 'cosmos') {
                                        // executeSendAphoton(dest, amount);
                                        console.log('send');
                                    }
                                    if (transfer == 'erc20') {
                                        executeERC20Transfer(
                                            address,
                                            dest,
                                            amount
                                        );
                                    }
                                    onClose();
                                }}
                            >
                                Send Coins{' '}
                                <FiSend style={{ marginLeft: '5px' }} />
                            </Button>
                            <Button variant="primary" onClick={onClose}>
                                Cancel
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Token;
