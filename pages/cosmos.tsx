import { Box } from '@chakra-ui/layout';
import CosmosCoins from '../src/assets/comoscoins';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';

const ERC20Page = () => {
    return (
        <Template
            active="cosmos"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <Box h="full" key="walletbox">
                    <CosmosCoins key="aphoton"></CosmosCoins>
                </Box>,
            ]}
        ></Template>
    );
};

export default ERC20Page;
