class MobileNavigation {
  private mobileToggle: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private isOpen: boolean;

  constructor() {
    this.isOpen = false;
    this.initializeElements();
    this.setupEventListeners();
  }

  private initializeElements(): void {
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
  }

  private setupEventListeners(): void {
    if (!this.mobileToggle || !this.mobileMenu) return;

    // Toggle do menu mobile
    this.mobileToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Fechar menu ao clicar em link
    const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (this.isOpen && 
          !this.mobileMenu?.contains(target) && 
          !this.mobileToggle?.contains(target)) {
        this.closeMenu();
      }
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  private toggleMenu(): void {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private openMenu(): void {
    if (!this.mobileToggle || !this.mobileMenu) return;

    this.isOpen = true;
    this.mobileToggle.classList.add('active');
    this.mobileMenu.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    // Focar no primeiro link para acessibilidade
    const firstLink = this.mobileMenu.querySelector('.mobile-nav-link') as HTMLElement;
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  private closeMenu(): void {
    if (!this.mobileToggle || !this.mobileMenu) return;

    this.isOpen = false;
    this.mobileToggle.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = '';
  }

  public isMenuOpen(): boolean {
    return this.isOpen;
  }
}

export default MobileNavigation;
