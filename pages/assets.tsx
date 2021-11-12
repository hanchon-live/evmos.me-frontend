import Aphoton from '../src/sections/cosmos';
import ERC20 from '../src/sections/erc20';
import EvmosHeader from '../src/sections/evmosheader';
import Template from '../src/template/template';

const Assets = () => {
    return (
        <Template
            active="assets"
            element={[
                <EvmosHeader key="header"></EvmosHeader>,
                <ERC20 key="erc20"></ERC20>,
                <Aphoton key="aphoton"></Aphoton>,
            ]}
        ></Template>
    );
};

export default Assets;
