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
                <ERC20 key="erc20"></ERC20>,
                <Aphoton key="aphoton"></Aphoton>,
            ]}
        ></Template>
    );
};

export default Wallet;
