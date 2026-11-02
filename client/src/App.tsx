import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Dashboard } from './Dashboard';

function App() {
    const [user, setUser] = useState<any>(null);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    // লগইন থাকলে ড্যাশবোর্ড দেখাবে
    if (user) {
        return <Dashboard user={user} onLogout={() => setUser(null)} />;
    }

    // লগইন না থাকলে রেজিস্টার বা লগইন পেজ দেখাবে
    return (
        <div>
            {isRegistering ? (
                <Register 
                    onRegisterSuccess={() => setIsRegistering(false)} 
                    onSwitchToLogin={() => setIsRegistering(false)} 
                />
            ) : (
                <Login 
                    onLoginSuccess={(data) => setUser(data)} 
                    onSwitchToRegister={() => setIsRegistering(true)} 
                />
            )}
        </div>
    );
}

export default App;