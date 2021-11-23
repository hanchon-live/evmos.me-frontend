import { Box } from '@chakra-ui/layout';
import Template from '../src/template/template';
import { Wallet } from '../src/sections/wallet';
import { store } from '../src/utils/state';
import { useContext } from 'react';
import { DeployErc20Section } from '../src/sections/deployerc20';

const DeployErc20Page = () => {
    return (
        <Template
            section="wallet"
            element={[
                <Box h="full" key="deployerc20box">
                    <DeployErc20Section key="deploypage" />
                </Box>,
            ]}
        ></Template>
    );
};

export default DeployErc20Page;
