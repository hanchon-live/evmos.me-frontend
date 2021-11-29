import { Box } from '@chakra-ui/layout';
import Template from '../src/template/template';
import { WalletUtilsSection } from '../src/sections/walletutil';

const WalletUtil = () => {
    return (
        <Template
            section="walletutil"
            element={[
                <Box h="full" key="walletbox">
                    <WalletUtilsSection key="walletcomponent" />
                </Box>,
            ]}
        ></Template>
    );
};

export default WalletUtil;
