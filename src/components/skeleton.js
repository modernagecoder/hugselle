export class SkeletonComponent {
  constructor(type = 'card') {
    this.type = type;
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'skeleton-container';

    switch (this.type) {
      case 'quote-card':
        container.appendChild(this.createQuoteCardSkeleton());
        break;
      case 'button':
        container.appendChild(this.createButtonSkeleton());
        break;
      case 'text':
        container.appendChild(this.createTextSkeleton());
        break;
      default:
        container.appendChild(this.createCardSkeleton());
    }

    this.element = container;
    return container;
  }

  createQuoteCardSkeleton() {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    
    // Quote text skeleton
    const textContainer = document.createElement('div');
    textContainer.className = 'skeleton-text-container';
    
    for (let i = 0; i < 3; i++) {
      const line = document.createElement('div');
      line.className = 'skeleton-line';
      if (i === 2) line.classList.add('skeleton-line-short');
      textContainer.appendChild(line);
    }
    
    // Button skeleton
    const buttonSkeleton = document.createElement('div');
    buttonSkeleton.className = 'skeleton-button';
    
    // Counter skeleton
    const counterSkeleton = document.createElement('div');
    counterSkeleton.className = 'skeleton-counter';
    
    card.appendChild(textContainer);
    card.appendChild(buttonSkeleton);
    card.appendChild(counterSkeleton);
    
    return card;
  }

  createButtonSkeleton() {
    const button = document.createElement('div');
    button.className = 'skeleton-button';
    return button;
  }

  createTextSkeleton(lines = 2) {
    const container = document.createElement('div');
    container.className = 'skeleton-text-container';
    
    for (let i = 0; i < lines; i++) {
      const line = document.createElement('div');
      line.className = 'skeleton-line';
      if (i === lines - 1) line.classList.add('skeleton-line-short');
      container.appendChild(line);
    }
    
    return container;
  }

  createCardSkeleton() {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    
    const header = document.createElement('div');
    header.className = 'skeleton-header';
    
    const content = this.createTextSkeleton(3);
    
    card.appendChild(header);
    card.appendChild(content);
    
    return card;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  static create(type = 'card') {
    const skeleton = new SkeletonComponent(type);
    return skeleton.render();
  }
}