import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not provided');
    return;
  }

  ReactGA.initialize(measurementId, {
    gaOptions: {
      cookieFlags: 'SameSite=None;Secure',
    },
    gtagOptions: {
      anonymize_ip: true, // Privacy-friendly
    },
  });

  console.log('Google Analytics initialized');
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
  console.log(`Page view tracked: ${path}`);
};

// Track custom events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
  console.log(`Event tracked: ${category} - ${action}`);
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  trackEvent('User Interaction', 'Button Click', buttonName);
};

// Track downloads
export const trackDownload = (fileName) => {
  trackEvent('Downloads', 'File Download', fileName);
};

// Track project views
export const trackProjectView = (projectName) => {
  trackEvent('Projects', 'View Project', projectName);
};

// Track blog post views
export const trackBlogView = (postTitle) => {
  trackEvent('Blog', 'View Post', postTitle);
};

// Track contact form submissions
export const trackContactSubmit = () => {
  trackEvent('Contact', 'Form Submit', 'Contact Form');
};

// Track chatbot interactions
export const trackChatMessage = () => {
  trackEvent('Chatbot', 'Message Sent', 'AI Chat');
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  trackEvent('Social Media', 'Link Click', platform);
};

// Track external links
export const trackExternalLink = (url) => {
  trackEvent('External Links', 'Click', url);
};

// Track timing (e.g., how long on a page)
export const trackTiming = (category, variable, value, label = '') => {
  ReactGA.event({
    category: 'Timing',
    action: category,
    label: `${variable}: ${value}ms - ${label}`,
    value: value,
  });
};

// Track errors
export const trackError = (description, fatal = false) => {
  ReactGA.event({
    category: 'Error',
    action: fatal ? 'Fatal Error' : 'Non-Fatal Error',
    label: description,
  });
};

// Track user engagement time
export const trackEngagement = (timeSpent, page) => {
  trackEvent('Engagement', 'Time Spent', page, timeSpent);
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackDownload,
  trackProjectView,
  trackBlogView,
  trackContactSubmit,
  trackChatMessage,
  trackSocialClick,
  trackExternalLink,
  trackTiming,
  trackError,
  trackEngagement,
};
