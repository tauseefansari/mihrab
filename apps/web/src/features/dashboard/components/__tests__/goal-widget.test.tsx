import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GoalWidget } from '@/features/dashboard/components/goal-widget';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

describe('GoalWidget component', () => {
  it('renders progress and translated labels', async () => {
    const Component = await GoalWidget();
    render(Component);

    expect(screen.getByText('trans_dailyGoalProgress')).toBeInTheDocument();
    expect(screen.getByText('trans_goalPercentage')).toBeInTheDocument();
    expect(screen.getByText('trans_tasksCompleted')).toBeInTheDocument();
  });
});
