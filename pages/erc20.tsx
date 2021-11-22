import { Box } from '@chakra-ui/layout';
import { useContext } from 'react';
import CosmosCoins from '../src/assets/comoscoins';
import ERC20Assets from '../src/assets/erc20Assets';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';
import { store } from '../src/utils/state';

const ERC20Page = () => {
    return (
        <Template
            section="erc20"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <Box h="full" key="walletbox">
                    <ERC20Assets key="erc20"></ERC20Assets>
                </Box>,
            ]}
        ></Template>
    );
};

export default ERC20Page;
