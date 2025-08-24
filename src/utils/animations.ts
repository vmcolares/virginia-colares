class IntersectionAnimations {
  private observer: IntersectionObserver;
  private animatedElements: Set<Element>;

  constructor() {
    this.animatedElements = new Set();
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Aguardar o DOM estar completamente carregado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.observeElements());
    } else {
      this.observeElements();
    }
  }

  private observeElements(): void {
    // Selecionar elementos para animação
    const elementsToAnimate = document.querySelectorAll(`
      .section,
      .timeline-item,
      .experience-card,
      .skill-card,
      .project-card,
      .contact-item,
      .hero-content,
      .hero-image
    `);

    elementsToAnimate.forEach((element) => {
      this.observer.observe(element);
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.animateElement(entry.target);
        this.animatedElements.add(entry.target);
      }
    });
  }

  private animateElement(element: Element): void {
    const animations = {
      '.hero-content': 'animate-fade-in',
      '.hero-image': 'animate-scale-in',
      '.section': 'animate-fade-in',
      '.timeline-item': 'animate-slide-in',
      '.experience-card': 'animate-fade-in',
      '.skill-card': 'animate-scale-in',
      '.project-card': 'animate-fade-in',
      '.contact-item': 'animate-slide-in'
    };

    // Encontrar a animação apropriada
    for (const [selector, animation] of Object.entries(animations)) {
      if (element.matches(selector)) {
        element.classList.add(animation);
        break;
      }
    }

    // Adicionar delay escalonado para cards em grid
    if (element.matches('.skill-card, .project-card')) {
      const siblings = Array.from(element.parentElement?.children || []);
      const index = siblings.indexOf(element);
      (element as HTMLElement).style.animationDelay = `${index * 100}ms`;
    }
  }

  public destroy(): void {
    this.observer.disconnect();
    this.animatedElements.clear();
  }

  public refresh(): void {
    this.destroy();
    this.animatedElements = new Set();
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    this.observeElements();
  }
}

export default IntersectionAnimations;
