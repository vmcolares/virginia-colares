class SmoothScrollManager {
  private readonly offset: number;

  constructor(offset: number = 80) {
    this.offset = offset;
    this.initializeScrollToTop();
    this.setupNavigationHandlers();
  }

  private initializeScrollToTop(): void {
    // Scroll para o topo ao carregar/recarregar a página
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  private setupNavigationHandlers(): void {
    // Handler para links de navegação
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link && link.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = link.getAttribute('href')!;
        this.scrollToSection(targetId);
        this.updateActiveNavigation(targetId);
      }
    });

    // Atualizar navegação ativa durante scroll
    this.setupScrollSpy();
  }

  private setupScrollSpy(): void {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            this.updateActiveNavigation(id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: `-${this.offset}px 0px -50% 0px`
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  public scrollToSection(targetId: string): void {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - this.offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Atualizar URL sem trigger do evento popstate
    if (targetId !== '#hero' && targetId !== '#') {
      history.pushState(null, '', targetId);
    } else {
      history.pushState(null, '', window.location.pathname);
    }
  }

  private updateActiveNavigation(activeId: string): void {
    // Remover classe active de todos os links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
      link.classList.remove('active');
    });

    // Adicionar classe active ao link correspondente
    const activeLinks = document.querySelectorAll(`a[href="${activeId}"]`);
    activeLinks.forEach((link) => {
      link.classList.add('active');
    });
  }

  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.updateActiveNavigation('#hero');
    history.pushState(null, '', window.location.pathname);
  }
}

export default SmoothScrollManager;
