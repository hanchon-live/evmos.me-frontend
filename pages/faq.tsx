import FAQSection from '../src/sections/faq';
import { TransactionsSendSection } from '../src/sections/send';
import Template from '../src/template/template';

const FAQ = () => {
    return (
        <Template section="faq" element={[<FAQSection key="faqsection" />]} />
    );
};

export default FAQ;
