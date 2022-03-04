import { TransactionsIBCSection } from '../src/sections/ibc';
import Template from '../src/template/template';

const Transactions = () => {
    return (
        <Template
            section="ibc"
            element={[<TransactionsIBCSection key="ibcelement" />]}
        />
    );
};

export default Transactions;
