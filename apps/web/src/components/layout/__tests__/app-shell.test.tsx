import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/app-shell';

vi.mock('@/components/layout/desktop-sidebar', () => ({
  DesktopSidebar: () => <nav data-testid="desktop-sidebar">Sidebar</nav>,
}));

vi.mock('@/components/layout/top-bar', () => ({
  TopBar: () => <header data-testid="top-bar">TopBar</header>,
}));

vi.mock('@/components/layout/mobile-bottom-nav', () => ({
  MobileBottomNav: () => <nav data-testid="mobile-bottom-nav">BottomNav</nav>,
}));

vi.mock('@/components/layout/mobile-sidebar-drawer', () => ({
  MobileSidebarDrawer: () => <aside data-testid="mobile-sidebar-drawer">Drawer</aside>,
}));

describe('AppShell', () => {
  it('renders sidebar, top bar, main content, mobile drawer, and mobile bottom nav', () => {
    render(
      <AppShell>
        <div>Test Page Content</div>
      </AppShell>
    );

    expect(screen.getByTestId('desktop-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-sidebar-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-bottom-nav')).toBeInTheDocument();
    expect(screen.getByText('Test Page Content')).toBeInTheDocument();
  });
});
