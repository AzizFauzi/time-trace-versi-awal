// Web Audio API Synthesized Sound Effect Manager
// Delivers atmospheric, zero-latency mystery and game audio feedback

class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private volume: number = 0.6; // Master volume multiplier

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('street_view_sfx_muted');
        this.muted = saved === 'true';
      } catch (e) {
        this.muted = false;
      }
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem('street_view_sfx_muted', String(this.muted));
    } catch (e) {}
    // If unmuting, warm up audio context
    if (!this.muted) {
      this.initContext();
      this.playTick();
    }
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem('street_view_sfx_muted', String(this.muted));
    } catch (e) {}
  }

  /**
   * Correct / Passed Guess: Resonant harmonic bell-chime major triad with warm decay
   */
  public playCorrect(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (harmonic major arpeggio)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      // Shimmering overtone
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18 * this.volume, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.95);
    });
  }

  /**
   * Incorrect / Failed Guess: Moody, deep descending cello/sub-bass tone with muted resonance
   */
  public playIncorrect(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Sub oscillator for deep mystery thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(146.83, now); // D3
    osc.frequency.exponentialRampToValueAtTime(82.41, now + 0.45); // Drop to E2

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);

    // Dissonant minor second overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(155.56, now + 0.05); // D#3 dissonant clash
    osc2.frequency.exponentialRampToValueAtTime(98.0, now + 0.4);

    gain2.gain.setValueAtTime(0.12 * this.volume, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.05);
    osc2.stop(now + 0.5);
  }

  /**
   * Level Up / Unlock Next Level: Triumphant time-portal arpeggio shimmer with celestial sweep
   */
  public playLevelUp(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Ascending celebratory fanfare: C5, E5, G5, B5, D6, E6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.22 * this.volume, now + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.25);
    });

    // Time-portal celestial sweep filter
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = 'sine';
    sweepOsc.frequency.setValueAtTime(400, now);
    sweepOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);

    sweepGain.gain.setValueAtTime(0.08 * this.volume, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    sweepOsc.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.75);
  }

  /**
   * Opening Modals: Subtle antique paper flutter & soft celestial chime
   */
  public playModalOpen(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Soft high chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6

    gain.gain.setValueAtTime(0.06 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);

    // Warm ambient base
    const baseOsc = ctx.createOscillator();
    const baseGain = ctx.createGain();
    baseOsc.type = 'triangle';
    baseOsc.frequency.setValueAtTime(329.63, now); // E4
    baseGain.gain.setValueAtTime(0.05 * this.volume, now);
    baseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    baseOsc.connect(baseGain);
    baseGain.connect(ctx.destination);

    baseOsc.start(now);
    baseOsc.stop(now + 0.2);
  }

  /**
   * Chrono Coins Earned: Metallic clink
   */
  public playCoin(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.frequency.setValueAtTime(1975.53, now); // B6 harmonic
    osc2.frequency.setValueAtTime(2637.02, now + 0.08);

    gain.gain.setValueAtTime(0.12 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  /**
   * Clock Tick / Timeline year step
   */
  public playTick(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

    gain.gain.setValueAtTime(0.04 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  /**
   * Time Shift: Temporal anomaly warp & cosmic chronometer resonance
   */
  public playTimeShift(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Deep temporal sub-bass warp sweep
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(260, now + 0.4);
    subOsc.frequency.exponentialRampToValueAtTime(80, now + 0.9);

    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.0);

    // 2. Swirling temporal harmonic arpeggio
    const chord = [440, 554.37, 659.25, 880, 1108.73]; // A major 7th shimmer
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, now + idx * 0.07 + 0.3);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.12 * this.volume, now + idx * 0.07 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.9);
    });

    // 3. Shimmering bell tick at arrival
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1760, now + 0.35); // A6
    bellGain.gain.setValueAtTime(0, now + 0.35);
    bellGain.gain.linearRampToValueAtTime(0.18 * this.volume, now + 0.37);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start(now + 0.35);
    bellOsc.stop(now + 1.15);
  }
}

export const soundManager = new SoundEffectManager();
