import { ReactNode } from 'react';
import { BottomTabNavigation } from './BottomTabNavigation';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Desktop Header */}
        <DesktopHeader />

        {/* Mobile Header (scroll-aware) */}
        <MobileHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-14 lg:pt-0 pb-16 lg:pb-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomTabNavigation />
      </div>
    </div>
  );
}
