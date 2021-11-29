import { ConvertCoinsSections } from '../src/sections/convertcoins';
import Template from '../src/template/template';

const ConvertCoins = () => {
    return (
        <Template
            section="convertcoins"
            element={[<ConvertCoinsSections key="convertcoinselement" />]}
        />
    );
};

export default ConvertCoins;
