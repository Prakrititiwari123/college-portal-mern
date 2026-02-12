import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


export default function ProtectedRoute({ children, requiredRole }) {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token || !user) {
            navigate('/');
            return;
        }

        if (requiredRole && user.role !== requiredRole) {
            navigate('/');
        }
    }, [token, user, requiredRole, navigate]);

    if (!token || !user) {
        return null;
    }

    if (requiredRole && user.role !== requiredRole) {
        return null;
    }

    return children;
}
