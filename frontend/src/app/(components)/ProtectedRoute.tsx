import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children } : { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/protected', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                }   else {
                    setIsAuthenticated(false);
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error checking authentication', error);
                setIsAuthenticated(false);
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (!isAuthenticated) {
        return <div style={{visibility: 'hidden'}} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;