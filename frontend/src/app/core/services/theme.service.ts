import { Injectable, signal, effect } from '@angular/core';

export type ColorTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSignal = signal<ColorTheme>('dark');
  public activeTheme = this.activeThemeSignal.asReadonly();

  constructor() {
    // Sync state to DOM
    effect(() => {
      const theme = this.activeThemeSignal();
      document.documentElement.setAttribute('data-ix-theme', 'classic');
      document.documentElement.setAttribute('data-ix-color-schema', theme);
      document.documentElement.setAttribute('data-element-theme', theme);
    });

    // Load initial preference
    let saved: ColorTheme = 'dark';
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('ecoinsight-theme');
      if (stored === 'light' || stored === 'dark') {
        saved = stored as ColorTheme;
      }
    }
    this.activeThemeSignal.set(saved);
  }

  public setTheme(theme: ColorTheme) {
    this.activeThemeSignal.set(theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ecoinsight-theme', theme);
    }
  }

  public toggleTheme() {
    const next = this.activeThemeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }
}
