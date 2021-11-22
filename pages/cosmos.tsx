import { useContext } from 'react';
import { CosmosSection } from '../src/sections/cosmos';
import Template from '../src/template/template';
import { store } from '../src/utils/state';

const Cosmos = () => {
    return (
        <Template element={[<CosmosSection key="cosmos" />]} section="cosmos" />
    );
};

export default Cosmos;
