import Aphoton from '../src/sections/cosmos';
import ERC20 from '../src/sections/erc20';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';
import SendAphotons from '../src/transactions/sendAphotons';
import { Heading } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/layout';
import DelegateAphotons from '../src/transactions/delegateAphotons';
import UndelegateAphotons from '../src/transactions/undelegateAphotons';

const Assets = () => {
    return (
        <Template
            active="transactions"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <Heading
                    key="txnsheading"
                    size="lg"
                    color="white"
                    textAlign="left"
                    w="full"
                    p={5}
                >
                    Cosmos Transactions
                </Heading>,
                <SimpleGrid
                    key="txnscalls"
                    columns={[1, 1, 1, 2, 3]}
                    mt={[2, 2, 4, 4]}
                    px={[2, 2, 4, 4]}
                    spacing={2}
                >
                    <SendAphotons />
                    <DelegateAphotons />
                    <UndelegateAphotons />
                </SimpleGrid>,
                // <ERC20 key="erc20"></ERC20>,
                // <Aphoton key="aphoton"></Aphoton>,
            ]}
        ></Template>
    );
};

export default Assets;
