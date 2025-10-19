export class ButtonUtils {
  static setLoading(button, isLoading = true) {
    if (!button) return;

    if (isLoading) {
      // Add loading class
      button.classList.add('button-loading');
      
      // Wrap text content if not already wrapped
      if (!button.querySelector('.button-text')) {
        const textSpan = document.createElement('span');
        textSpan.className = 'button-text';
        textSpan.textContent = button.textContent;
        button.textContent = '';
        button.appendChild(textSpan);
      }
      
      // Disable button
      button.disabled = true;
    } else {
      // Remove loading class
      button.classList.remove('button-loading');
      
      // Re-enable button
      button.disabled = false;
    }
  }

  static addPressEffect(button) {
    if (!button) return;

    const handleMouseDown = () => {
      button.classList.add('button-pressed');
    };

    const handleMouseUp = () => {
      button.classList.remove('button-pressed');
    };

    const handleMouseLeave = () => {
      button.classList.remove('button-pressed');
    };

    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('touchstart', handleMouseDown);
    button.addEventListener('touchend', handleMouseUp);

    // Return cleanup function
    return () => {
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('touchstart', handleMouseDown);
      button.removeEventListener('touchend', handleMouseUp);
    };
  }

  static async animateClick(button, duration = 150) {
    if (!button) return;

    button.classList.add('button-pressed');
    await new Promise(resolve => setTimeout(resolve, duration));
    button.classList.remove('button-pressed');
  }
}