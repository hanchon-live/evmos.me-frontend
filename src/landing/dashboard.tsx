import { Button } from '@chakra-ui/button';
import { Box, Link } from '@chakra-ui/layout';
import { BsArrowRightCircle } from 'react-icons/bs';

const Dashboard = () => {
    return (
        <div>
            <Link href="/cosmos" _hover={{ textDecor: 'none' }}>
                <Button variant="primary">
                    Go to dashboard
                    <Box ml="2">
                        <BsArrowRightCircle />
                    </Box>
                </Button>
            </Link>
        </div>
    );
};

export default Dashboard;
