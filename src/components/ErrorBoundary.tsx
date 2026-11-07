import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TimeTrace ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      localStorage.removeItem('time_trace_player_progress');
    } catch (_) {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl font-bold">
              ⏳
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
              Anomali Temporal Terdeteksi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Terjadi sedikit gangguan koneksi atau data saat memuat arsip. Silakan muat ulang halaman untuk kembali menjelajah.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Muat Ulang Halaman
              </button>
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

