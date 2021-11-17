import { Box } from '@chakra-ui/layout';
import CosmosCoins from '../src/assets/comoscoins';
import EvmosHeader from '../src/header/evmosheader';
import Template from '../src/template/template';

const Dashboard = () => {
    return (
        <Template
            element={[
                <Box h="full" key="walletbox">
                    <CosmosCoins key="aphoton"></CosmosCoins>
                </Box>,
            ]}
        ></Template>
    );
};

export default Dashboard;
