import { Box } from '@chakra-ui/layout';
import CosmosCoins from '../src/assets/comoscoins';
import ERC20Assets from '../src/assets/erc20Assets';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';

const Wallet = () => {
    return (
        <Template
            active="wallet"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <Box h="full" key="walletbox">
                    <ERC20Assets key="erc20"></ERC20Assets>
                    <CosmosCoins key="aphoton"></CosmosCoins>
                </Box>,
            ]}
        ></Template>
    );
};

export default Wallet;
