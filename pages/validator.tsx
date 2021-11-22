import { useContext } from 'react';
import { TransactionsValidatorSection } from '../src/sections/validator';
import Template from '../src/template/template';
import { store } from '../src/utils/state';

const Transactions = () => {
    return (
        <Template
            section="validator"
            element={[<TransactionsValidatorSection key="section" />]}
        />
    );
};

export default Transactions;
