import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-primary/20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Subtle Background Elements */}
                <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

                <Outlet />
            </main>

            <Footer />

            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '16px',
                        color: '#1e293b',
                    },
                }}
            />
        </div>
    );
};
