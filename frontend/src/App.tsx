import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { ForProfessionals } from './pages/ForProfessionals';
import { HelpCenter } from './pages/HelpCenter';
import { Showcase } from './pages/Showcase';
import { UploadDemo } from './pages/UploadDemo';
import { VerificationDemo } from './pages/VerificationDemo';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { OAuthCallback } from './pages/OAuthCallback';
import { EmailVerificationSent } from './pages/EmailVerificationSent';
import { EmailVerification } from './pages/EmailVerification';
import { SMSVerification } from './pages/SMSVerification';
import { AcceptTerms } from './pages/AcceptTerms';
import { CompleteProfile } from './pages/CompleteProfile';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<OAuthCallback />} />
                <Route path="/email-verification-sent" element={<EmailVerificationSent />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/verify-phone" element={<SMSVerification />} />
                <Route path="/sms-verification" element={<SMSVerification />} />
                <Route path="/accept-terms" element={<AcceptTerms />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />

                {/* Landing pages */}
                <Route path="/" element={<Home />} />
                <Route path="/para-profesionales" element={<ForProfessionals />} />
                <Route path="/help-center" element={<HelpCenter />} />

                {/* Demo routes */}
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/upload-demo" element={<UploadDemo />} />
                <Route path="/verification-demo" element={<VerificationDemo />} />

                {/* App routes (will be protected later) */}
                <Route path="/buscar" element={<div className="p-4">Buscar Page (Coming Soon)</div>} />
                <Route path="/chats" element={<div className="p-4">Chats Page (Coming Soon)</div>} />
                <Route path="/perfil" element={<div className="p-4">Perfil Page (Coming Soon)</div>} />
              </Routes>
            </Router>
          </AuthProvider>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
