import { Box } from '@chakra-ui/layout';
import Template from '../src/template/template';
import { Wallet } from '../src/sections/wallet';
import { store } from '../src/utils/state';
import { useContext } from 'react';

const WalletPage = () => {
    return (
        <Template
            section="wallet"
            element={[
                <Box h="full" key="walletbox">
                    <Wallet />
                </Box>,
            ]}
        ></Template>
    );
};

export default WalletPage;
