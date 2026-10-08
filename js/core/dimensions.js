/* ========================================================
   DIMENSIONS — window size / orientation util
   Vanilla equivalent of React Native's useWindowDimensions().
   Components read the size from here instead of hard-coding widths;
   CSS reads it through --vw / --vh and html[data-device|data-orientation].
   ======================================================== */
import { BREAKPOINTS } from './constants.js';

/**
 * Current window size, orientation and device class.
 * Uses visualViewport when available (accurate on mobile where the
 * URL bar makes innerHeight / 100vh unreliable).
 * @returns {{width:number,height:number,orientation:'portrait'|'landscape',device:'mobile'|'tablet'|'desktop',isMobile:boolean,isTablet:boolean,isDesktop:boolean}}
 */
export function getWindowDimensions() {
  const vv = window.visualViewport;
  const width = Math.round(vv?.width ?? window.innerWidth);
  const height = Math.round(vv?.height ?? window.innerHeight);
  const device = width < BREAKPOINTS.tablet ? 'mobile' : width < BREAKPOINTS.desktop ? 'tablet' : 'desktop';
  return {
    width,
    height,
    orientation: width > height ? 'landscape' : 'portrait',
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
}

/**
 * Subscribe to size / rotation changes. The callback fires once
 * immediately, then on resize + orientationchange (rAF-throttled).
 * @param {(dim: ReturnType<typeof getWindowDimensions>) => void} callback
 * @returns {() => void} unsubscribe
 */
export function onWindowDimensions(callback) {
  let frame = 0;
  const notify = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => callback(getWindowDimensions()));
  };
  window.addEventListener('resize', notify, { passive: true });
  window.addEventListener('orientationchange', notify, { passive: true });
  window.visualViewport?.addEventListener('resize', notify, { passive: true });
  callback(getWindowDimensions());
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', notify);
    window.removeEventListener('orientationchange', notify);
    window.visualViewport?.removeEventListener('resize', notify);
  };
}

/**
 * Mirror the dimensions onto <html> so CSS can react:
 *   var(--vw) / var(--vh)  → real px size (use calc(var(--vh) * 1px))
 *   html[data-device="mobile|tablet|desktop"]
 *   html[data-orientation="portrait|landscape"]
 * @returns {() => void} unsubscribe
 */
export function initDimensions() {
  const root = document.documentElement;
  return onWindowDimensions(({ width, height, orientation, device }) => {
    root.style.setProperty('--vw', width);
    root.style.setProperty('--vh', height);
    root.dataset.orientation = orientation;
    root.dataset.device = device;
  });
}
