import { ProposalsSections } from '../src/sections/proposals';
import Template from '../src/template/template';

const Transactions = () => {
    return (
        <Template
            section="proposals"
            element={[<ProposalsSections key="proposalselement" />]}
        />
    );
};

export default Transactions;
