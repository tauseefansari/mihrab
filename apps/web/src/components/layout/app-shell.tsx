import type { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { DesktopSidebar } from '@/components/layout/desktop-sidebar';
import { TopBar } from '@/components/layout/top-bar';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { MobileSidebarDrawer } from '@/components/layout/mobile-sidebar-drawer';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Box
      as="div"
      className="bg-background text-on-background relative flex h-dvh h-screen max-h-dvh max-h-screen w-full overflow-hidden antialiased"
    >
      {/* Desktop Sidebar (hidden on mobile) */}
      <DesktopSidebar />

      {/* Main Content Canvas */}
      <Box as="main" className="flex h-full flex-1 flex-col overflow-hidden">
        {/* Global Top Bar */}
        <TopBar />

        {/* Content Container - Fixed frame with dedicated vertical scrollbar */}
        <Box
          as="div"
          className="p-margin-mobile md:p-margin-desktop md:pb-margin-desktop flex-1 overflow-y-auto overscroll-y-contain pb-28"
        >
          <Box as="div" className="w-full">
            {children}
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer (hidden on desktop) */}
      <MobileSidebarDrawer />

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <MobileBottomNav />
    </Box>
  );
}
