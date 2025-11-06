import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [apiMessage, setApiMessage] = useState<string>('');

  useEffect(() => {
    // Test API connection
    const checkAPI = async () => {
      try {
        const response = await axios.get('http://localhost:3000/health');
        setApiStatus('✅ Connected');
        setApiMessage(response.data.message);
      } catch (error) {
        setApiStatus('❌ Not connected');
        setApiMessage('Make sure backend is running on port 3000');
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            TrustMe Development
          </h1>
          <p className="text-lg text-neutral-600">
            Phase 0, Day 1: Environment Setup
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Frontend Status */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Frontend Status
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Framework:</span>
                <span className="font-medium">React 18 + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Build Tool:</span>
                <span className="font-medium">Vite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Styling:</span>
                <span className="font-medium">Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Status:</span>
                <span className="badge-success">Running ✅</span>
              </div>
            </div>
          </div>

          {/* Backend Status */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Backend Status
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Framework:</span>
                <span className="font-medium">Express + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Runtime:</span>
                <span className="font-medium">Node.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Port:</span>
                <span className="font-medium">3000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">API Status:</span>
                <span className={apiStatus.includes('✅') ? 'badge-success' : 'badge-error'}>
                  {apiStatus}
                </span>
              </div>
              {apiMessage && (
                <div className="mt-3 p-2 bg-neutral-100 rounded text-xs text-neutral-600">
                  {apiMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Design System Demo */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Design System Demo
          </h2>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Brand Colors</h3>
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-primary-400 rounded-md flex items-center justify-center text-white text-xs font-medium">
                Primary
              </div>
              <div className="flex-1 h-12 bg-success-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                Success
              </div>
              <div className="flex-1 h-12 bg-warning-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                Warning
              </div>
              <div className="flex-1 h-12 bg-error-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                Error
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-tertiary">Tertiary Button</button>
              <button className="btn-primary" disabled>Disabled Button</button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge-primary">Primary</span>
              <span className="badge-success">Success</span>
              <span className="badge-warning">Warning</span>
              <span className="badge-error">Error</span>
            </div>
          </div>

          {/* Input */}
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Input Field</h3>
            <input
              type="text"
              className="input max-w-md"
              placeholder="Enter text here..."
            />
          </div>
        </div>

        {/* Next Steps */}
        <div className="card bg-primary-50 border border-primary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">
            Next Steps
          </h2>
          <ul className="space-y-2 text-sm text-primary-800">
            <li>✅ Frontend project set up (React 18 + TypeScript + Vite)</li>
            <li>✅ Backend project set up (Express + TypeScript)</li>
            <li>✅ Tailwind CSS configured with design system</li>
            <li>✅ Environment variables structure created</li>
            <li>✅ Basic folder structure established</li>
            <li>⏳ Configure ESLint and Prettier</li>
            <li>⏳ Set up database (Day 2)</li>
            <li>⏳ Implement authentication skeleton (Day 3)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
