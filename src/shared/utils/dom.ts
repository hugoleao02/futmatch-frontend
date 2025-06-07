// Scroll utilities
export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

export const scrollToElement = (element: Element | string, smooth = true, offset = 0): void => {
  const target = typeof element === 'string' ? document.querySelector(element) : element;

  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
};

// Viewport utilities
export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getViewportSize = () => ({
  width: window.innerWidth || document.documentElement.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight,
});

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch {
    return false;
  }
};

// Download file
export const downloadFile = (data: string, filename: string, type = 'text/plain'): void => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

// Full screen utilities
export const enterFullscreen = (element?: Element): Promise<void> => {
  const target = element || document.documentElement;

  if (target.requestFullscreen) {
    return target.requestFullscreen();
  }

  return Promise.reject(new Error('Fullscreen not supported'));
};

export const exitFullscreen = (): Promise<void> => {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  }

  return Promise.reject(new Error('Exit fullscreen not supported'));
};

export const isFullscreen = (): boolean => {
  return Boolean(document.fullscreenElement);
};

// Focus management
export const trapFocus = (element: Element): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: Event) => {
    const keyboardEvent = e as KeyboardEvent;
    if (keyboardEvent.key === 'Tab') {
      if (keyboardEvent.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          keyboardEvent.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          keyboardEvent.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Device detection
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isTouch = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
