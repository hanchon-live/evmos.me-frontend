import { TransactionsSendSection } from '../src/sections/send';
import Template from '../src/template/template';

const Transactions = () => {
    return (
        <Template
            section="send"
            element={[<TransactionsSendSection key="sendelement" />]}
        />
    );
};

export default Transactions;
