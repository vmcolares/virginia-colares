import ThemeManager from './utils/themeManager';
import SmoothScrollManager from './utils/smoothScroll';
import IntersectionAnimations from './utils/animations';
import MobileNavigation from './utils/mobileNavigation';

class PortfolioApp {
  private themeManager!: ThemeManager;
  private scrollManager!: SmoothScrollManager;
  private animations!: IntersectionAnimations;
  private mobileNav!: MobileNavigation;

  constructor() {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Inicializar componentes
    this.themeManager = new ThemeManager();
    this.scrollManager = new SmoothScrollManager();
    this.animations = new IntersectionAnimations();
    this.mobileNav = new MobileNavigation();

    // Configurar handlers adicionais
    this.setupThemeToggle();
    this.setupHeaderScroll();
    this.setupContactForm();
    this.setupTypingEffect();

    console.log('🚀 Portfolio App inicializado com sucesso!');
  }

  private setupThemeToggle(): void {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.themeManager.toggleTheme();
        this.updateThemeIcon();
      });
      
      // Configurar ícone inicial
      this.updateThemeIcon();
    }

    // Escutar mudanças de tema
    window.addEventListener('themeChanged', () => {
      this.updateThemeIcon();
    });
  }

  private updateThemeIcon(): void {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = this.themeManager.getCurrentTheme();
    const icon = currentTheme === 'light' ? 
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' :
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>';
    
    themeToggle.innerHTML = icon;
  }

  private setupHeaderScroll(): void {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Auto-hide header em mobile durante scroll para baixo
      if (window.innerWidth <= 768) {
        if (scrollY > lastScrollY && scrollY > 100) {
          (header as HTMLElement).style.transform = 'translateY(-100%)';
        } else {
          (header as HTMLElement).style.transform = 'translateY(0)';
        }
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  private setupContactForm(): void {
    const form = document.querySelector('.contact-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactSubmit(form);
    });
  }

  private async handleContactSubmit(form: HTMLFormElement): Promise<void> {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simular envio (você pode integrar com um serviço real)
      console.log('Dados do formulário:', data);
      
      // Mostrar feedback de sucesso
      this.showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      form.reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--accent-primary)' : '#ef4444'};
      color: white;
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-tooltip);
      transform: translateX(100%);
      transition: transform var(--transition-normal);
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Remover após 5 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  private setupTypingEffect(): void {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const text = titleElement.textContent || '';
    titleElement.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
      if (index < text.length) {
        titleElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    // Iniciar efeito após um pequeno delay
    setTimeout(typeWriter, 500);
  }

  // Método público para reinicializar componentes (útil para desenvolvimento)
  public refresh(): void {
    this.animations.refresh();
    // Reinicializar outros componentes se necessário
    if (this.scrollManager) {
      console.log('📜 Scroll manager ativo');
    }
    if (this.mobileNav) {
      console.log('📱 Mobile navigation ativo');
    }
    console.log('🔄 Portfolio App recarregado!');
  }
}

// Inicializar aplicação
const app = new PortfolioApp();

// Disponibilizar globalmente para desenvolvimento
(window as any).portfolioApp = app;

export default PortfolioApp;
