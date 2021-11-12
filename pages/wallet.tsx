import EvmosHeader from '../src/sections/evmosheader';
import WalletDetails from '../src/sections/walletdetails';
import Template from '../src/template/template';

const Wallet = () => {
    return (
        <Template
            active="wallet"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <WalletDetails key="wallet" />,
            ]}
        ></Template>
    );
};

export default Wallet;
