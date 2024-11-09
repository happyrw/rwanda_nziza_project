import VerifyEmailComponent from '@/components/auth/VerifyEmailComponent';
import { Suspense } from 'react';

const VerifyEmailPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailComponent />
        </Suspense>
    );
}

export default VerifyEmailPage;
