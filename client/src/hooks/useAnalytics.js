import { useEffect } from 'react'

export function useAnalytics() {
  useEffect(() => {
    // prettier-ignore
    if (import.meta.env.VITE_ENV_RELEASE === 'true') {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line no-inner-declarations, no-undef
      function gtag () { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-4C109JEE0T');

      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "ikppq7ny7u");
    }
  }, [])
}
