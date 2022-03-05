import { TransactionsVotingSection } from '../src/sections/voting';
import Template from '../src/template/template';

const Transactions = () => {
    return (
        <Template
            section="voting"
            element={[<TransactionsVotingSection key="votingelement" />]}
        />
    );
};

export default Transactions;
