import { Heading, Text, SimpleGrid, Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { getAllBalances } from '../utils/backend';
import { getWalletEth } from '../utils/db';
import Token from './token';

const CosmosCoins = () => {
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        async function readBalances() {
            let temp = await getAllBalances(getWalletEth());
            setCoins(temp.balances);
        }
        readBalances();
    }, []);
    return (
        <Box h="auto">
            <Box w="full" p={5}>
                <Heading size="lg" color="white" textAlign="center">
                    Cosmos Coins
                </Heading>
                <Text py={2} textAlign="center">
                    All the registered Cosmos Coins on Evmos.me
                </Text>
            </Box>
            <SimpleGrid
                mt={2}
                columns={
                    coins.length == 1
                        ? [1]
                        : coins.length == 2
                        ? [1, 1, 2, 2, 2]
                        : coins.length == 3
                        ? [1, 1, 2, 3, 3]
                        : [1, 1, 2, 3, 4]
                }
                columnGap={[0, 0, 3, 3, 3]}
                rowGap={6}
                h="full"
                justifyItems="flex-start"
            >
                {coins.map((item) => (
                    <Token
                        Icon={FaReact}
                        name={item.denom}
                        balance={item.amount}
                        key={item.denom}
                        transfer={'cosmos'}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default CosmosCoins;
