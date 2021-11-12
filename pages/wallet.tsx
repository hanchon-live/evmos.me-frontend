import { Box } from '@chakra-ui/layout';
import ERC20Assets from '../src/assets/erc20Assets';
import EvmosHeader from '../src/header/evmosheader';
import Aphoton from '../src/sections/cosmos';
import ERC20 from '../src/sections/erc20';
import WalletDetails from '../src/sections/walletdetails';
import Template from '../src/template/template';

const Wallet = () => {
    return (
        <Template
            active="wallet"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                // <WalletDetails key="wallet" />,
                <Box className="data" h="full">
                    <ERC20Assets key="erc20"></ERC20Assets>,
                    <Aphoton key="aphoton"></Aphoton>,
                </Box>,
            ]}
        ></Template>
    );
};

export default Wallet;
