import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PublicHeader } from '../components/PublicHeader';
import { Input, Button } from '../components/ui';
import { Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Import markdown content
import termsContent from '../docs/terms.md?raw';
import privacyContent from '../docs/privacy.md?raw';
import cookiesContent from '../docs/cookies.md?raw';

type TabType = 'terms' | 'privacy' | 'cookies';

const TAB_LABELS: Record<TabType, string> = {
  terms: 'Términos y condiciones',
  privacy: 'Política de privacidad',
  cookies: 'Política de cookies',
};

const TAB_CONTENT: Record<TabType, string> = {
  terms: termsContent,
  privacy: privacyContent,
  cookies: cookiesContent,
};

export function HelpCenter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('terms');

  // Parse tab from URL on mount and when URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'privacy' || tabParam === 'cookies' || tabParam === 'terms') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleTabChange = (newTab: TabType) => {
    if (newTab === activeTab) return;
    navigate(`/help-center?tab=${newTab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Encuentra información sobre nuestras políticas y términos de servicio.
            </p>
          </div>

          {/* FAQ Search Placeholder */}
          <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar preguntas (próximamente)"
                disabled
                className="pl-10 bg-gray-50"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Esta función estará disponible próximamente. Mientras tanto, puedes consultar nuestras políticas abajo.
            </p>
          </div>

          {/* Tabbed Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">
            {/* Tab Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
                {(['terms', 'privacy', 'cookies'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      flex-shrink-0 px-4 py-3 rounded-xl text-left text-sm sm:text-base font-medium transition-all whitespace-nowrap lg:whitespace-normal
                      ${activeTab === tab
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {TAB_LABELS[tab]}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10">
                <article className="prose prose-slate max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 text-gray-600 space-y-2">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm sm:text-base">
                          {children}
                        </li>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border border-gray-200 rounded-lg">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-gray-50">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 text-sm">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-sm">
                          {children}
                        </td>
                      ),
                      em: ({ children }) => (
                        <em className="text-gray-500 text-sm">
                          {children}
                        </em>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-800">
                          {children}
                        </strong>
                      ),
                      hr: () => (
                        <hr className="my-8 border-gray-200" />
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-sky-600 hover:text-sky-700 underline font-medium"
                          onClick={(e) => {
                            if (href?.startsWith('/help-center?tab=')) {
                              e.preventDefault();
                              navigate(href);
                            }
                          }}
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {TAB_CONTENT[activeTab]}
                  </ReactMarkdown>
                </article>
              </div>

              {/* Back to Home CTA */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al inicio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; 2025 TrustMe. Todos los derechos reservados. Ciudad de México, México.
          </p>
        </div>
      </footer>
    </div>
  );
}
