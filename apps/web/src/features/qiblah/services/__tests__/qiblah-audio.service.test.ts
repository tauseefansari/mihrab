import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QiblahAudioService } from '@/features/qiblah/services/qiblah-audio.service';

describe('QiblahAudioService', () => {
  let mockOscillator: {
    type: string;
    frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
    connect: ReturnType<typeof vi.fn>;
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
  };

  let mockGain: {
    gain: {
      setValueAtTime: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
    };
    connect: ReturnType<typeof vi.fn>;
  };

  let mockAudioContext: {
    state: AudioContextState;
    currentTime: number;
    destination: Record<string, unknown>;
    resume: ReturnType<typeof vi.fn>;
    createOscillator: ReturnType<typeof vi.fn>;
    createGain: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockOscillator = {
      type: 'sine',
      frequency: { setValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockGain = {
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };

    mockAudioContext = {
      state: 'running',
      currentTime: 10,
      destination: {},
      resume: vi.fn().mockResolvedValue(undefined),
      createOscillator: vi.fn().mockReturnValue(mockOscillator),
      createGain: vi.fn().mockReturnValue(mockGain),
    };

    // Reset static audioCtx
    // @ts-expect-error accessing private property for test isolation
    QiblahAudioService.audioCtx = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('plays two harmonic chime tones when AudioContext is supported', async () => {
    class MockAudioContext {
      constructor() {
        return mockAudioContext;
      }
    }
    vi.stubGlobal('AudioContext', MockAudioContext);
    window.AudioContext = MockAudioContext as unknown as typeof AudioContext;

    await QiblahAudioService.playAlignmentChime();

    expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(2);
    expect(mockAudioContext.createGain).toHaveBeenCalledTimes(2);
    expect(mockOscillator.start).toHaveBeenCalledTimes(2);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(2);
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(528, 10);
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(660, 10.08);
  });

  it('resumes AudioContext if it is in suspended state', async () => {
    mockAudioContext.state = 'suspended';
    class MockAudioContext {
      constructor() {
        return mockAudioContext;
      }
    }
    vi.stubGlobal('AudioContext', MockAudioContext);
    window.AudioContext = MockAudioContext as unknown as typeof AudioContext;

    await QiblahAudioService.playAlignmentChime();

    expect(mockAudioContext.resume).toHaveBeenCalled();
  });

  it('recreates AudioContext if previous instance was closed', async () => {
    // @ts-expect-error accessing private property for test isolation
    QiblahAudioService.audioCtx = { state: 'closed' };
    class MockAudioContext {
      constructor() {
        return mockAudioContext;
      }
    }
    vi.stubGlobal('AudioContext', MockAudioContext);
    window.AudioContext = MockAudioContext as unknown as typeof AudioContext;

    await QiblahAudioService.playAlignmentChime();

    expect(mockAudioContext.createOscillator).toHaveBeenCalled();
  });

  it('gracefully handles missing AudioContext', async () => {
    // @ts-expect-error mocking undefined AudioContext
    window.AudioContext = undefined;
    // @ts-expect-error mocking undefined webkitAudioContext
    window.webkitAudioContext = undefined;
    vi.stubGlobal('AudioContext', undefined);
    vi.stubGlobal('webkitAudioContext', undefined);

    await expect(QiblahAudioService.playAlignmentChime()).resolves.toBeUndefined();
  });

  it('catches and suppresses playback errors', async () => {
    mockAudioContext.createOscillator = vi.fn().mockImplementation(() => {
      throw new Error('Audio policy blocked');
    });
    class MockAudioContext {
      constructor() {
        return mockAudioContext;
      }
    }
    vi.stubGlobal('AudioContext', MockAudioContext);
    window.AudioContext = MockAudioContext as unknown as typeof AudioContext;

    await expect(QiblahAudioService.playAlignmentChime()).resolves.toBeUndefined();
  });
});
