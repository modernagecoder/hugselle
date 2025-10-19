export class SpinnerComponent {
  constructor(size = 'medium') {
    this.size = size;
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = `spinner-container spinner-${this.size}`;
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    container.appendChild(spinner);
    this.element = container;
    
    return container;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  static createInline(size = 'small') {
    const spinner = new SpinnerComponent(size);
    return spinner.render();
  }
}