import { CosmosSection } from '../src/sections/cosmos';
import Template from '../src/template/template';

const Cosmos = () => {
    return (
        <Template element={[<CosmosSection key="cosmos" />]} section="cosmos" />
    );
};

export default Cosmos;
