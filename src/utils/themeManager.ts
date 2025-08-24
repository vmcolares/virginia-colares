import type { ThemeConfig } from '../types/portfolio';

class ThemeManager {
  private config: ThemeConfig;
  private readonly STORAGE_KEY = 'portfolio-theme';

  constructor() {
    this.config = this.loadThemeConfig();
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  private loadThemeConfig(): ThemeConfig {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback se o JSON estiver corrompido
      }
    }
    
    return {
      theme: this.getSystemPreference(),
      systemPreference: true
    };
  }

  private saveThemeConfig(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
  }

  private getSystemPreference(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private initializeTheme(): void {
    const theme = this.config.systemPreference ? this.getSystemPreference() : this.config.theme;
    this.applyTheme(theme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.config.theme = theme;
    
    // Atualizar meta theme-color para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a0f0c' : '#faf9f8');
    }
    
    // Dispatch custom event para outros componentes
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme, systemPreference: this.config.systemPreference }
    }));
  }

  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.config.systemPreference) {
        this.applyTheme(this.getSystemPreference());
      }
    });
  }

  public toggleTheme(): void {
    const newTheme = this.config.theme === 'light' ? 'dark' : 'light';
    this.config.systemPreference = false;
    this.applyTheme(newTheme);
    this.saveThemeConfig();
  }

  public setSystemPreference(useSystem: boolean): void {
    this.config.systemPreference = useSystem;
    if (useSystem) {
      this.applyTheme(this.getSystemPreference());
    }
    this.saveThemeConfig();
  }

  public getCurrentTheme(): 'light' | 'dark' {
    return this.config.theme;
  }

  public isUsingSystemPreference(): boolean {
    return this.config.systemPreference;
  }
}

export default ThemeManager;
