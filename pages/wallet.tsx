import { Heading } from '@chakra-ui/layout';

import { Box } from '@chakra-ui/layout';
import CosmosCoins from '../src/assets/comoscoins';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';
import Wallet from '../src/sections/wallet';

const WalletPage = () => {
    return (
        <Template
            element={[
                <Box h="full" key="walletbox">
                    <Wallet />
                </Box>,
            ]}
        ></Template>
    );
};

export default WalletPage;
