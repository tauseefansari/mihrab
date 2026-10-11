import React from 'react';
import { Box } from '@/components/ui/box';
import { DesktopSidebar } from '@/components/layout/desktop-sidebar';
import { TopBar } from '@/components/layout/top-bar';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="div"
      className="bg-background text-on-background relative mx-auto flex min-h-screen w-full max-w-screen-2xl overflow-hidden antialiased shadow-2xl"
    >
      {/* Desktop Sidebar (hidden on mobile) */}
      <DesktopSidebar />

      {/* Main Content Canvas */}
      <Box as="main" className="flex flex-1 flex-col">
        {/* Global Top Bar */}
        <TopBar />

        {/* Content Container */}
        <Box
          as="div"
          className="p-margin-mobile md:p-margin-desktop md:pb-margin-desktop flex-1 pb-24"
        >
          <Box as="div" className="mx-auto w-full">
            {children}
          </Box>
        </Box>
      </Box>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <MobileBottomNav />
    </Box>
  );
}
