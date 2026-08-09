// Vercel Speed Insights for static HTML
// This script injects Speed Insights tracking into the page

(function() {
  // Initialize the queue if not already present
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }

  // Detect environment
  function isDevelopment() {
    try {
      return window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' ||
             window.location.hostname.includes('localhost');
    } catch (e) {
      return false;
    }
  }

  // Get the appropriate script URL
  var scriptSrc = isDevelopment() 
    ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
    : 'https://va.vercel-scripts.com/v1/speed-insights/script.js';

  // Create and inject the script
  var script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '1.3.1');

  // Add error handling
  script.onerror = function() {
    console.error('Failed to load Vercel Speed Insights');
  };

  // Inject the script into the page
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // Fallback if head is not yet available
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
})();
