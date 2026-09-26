// Page-level patch executing directly in MAIN world
// Neutering Metronic layoutService auto-scroll and jQuery scrollTop: 0 animations

(function() {
  'use strict';

  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch (e) {}

  function isHomeView() {
    return document.body && (
      document.body.classList.contains('view-services') ||
      (document.body.classList.contains('view-home') &&
       !document.body.classList.contains('view-downloads') &&
       !document.body.classList.contains('view-form'))
    );
  }

  function patchJQuery() {
    try {
      if (window.jQuery && window.jQuery.fn && window.jQuery.fn.animate) {
        if (window.jQuery.fn.animate._vposPatched) return true;
        const origAnimate = window.jQuery.fn.animate;
        const patched = function(prop, speed, easing, callback) {
          if (prop && (prop.scrollTop === 0 || prop.scrollTop === '0')) {
            const saved = sessionStorage.getItem('vpos_home_scroll');
            if (isHomeView() && saved && parseInt(saved, 10) > 0) {
              // Block Metronic from animating to top on home grid
              if (typeof speed === 'function') speed.call(this);
              else if (typeof callback === 'function') callback.call(this);
              return this;
            }
          }
          return origAnimate.apply(this, arguments);
        };
        patched._vposPatched = true;
        window.jQuery.fn.animate = patched;
        return true;
      }
    } catch (e) {}
    return false;
  }

  function patchAngular() {
    try {
      if (window.angular) {
        const el = document.querySelector('[ng-app]') || document.querySelector('.page-container') || document.body;
        if (!el) return false;
        const injector = window.angular.element(el).injector();
        if (injector && injector.has('layoutService')) {
          const ls = injector.get('layoutService');
          if (ls && !ls._vposPatched) {
            ls._vposPatched = true;
            // Prevent Metronic from triggering automatic scroll to top after state change
            ls.pageAutoScrollOnLoad = 999999999;
            const orig = ls.scrollTo;
            ls.scrollTo = function(targetEl, offset) {
              // If targetEl is empty/undefined, Metronic is trying to scroll to top (0,0)
              if (!targetEl || (targetEl.size && targetEl.size() === 0) || (targetEl.length && targetEl.length === 0)) {
                if (isHomeView()) return;
              }
              return orig ? orig.apply(this, arguments) : undefined;
            };
            return true;
          }
        }
      }
    } catch (e) {}
    return false;
  }

  // Hook immediately and keep polling until both frameworks are ready
  patchJQuery();
  patchAngular();
  const poll = setInterval(function() {
    const jq = patchJQuery();
    const ng = patchAngular();
    if (jq && ng) clearInterval(poll);
  }, 100);
})();
