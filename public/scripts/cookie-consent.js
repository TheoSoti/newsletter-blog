(function () {
	const GA_MEASUREMENT_ID = 'G-T2TYZW69XZ';
	let analyticsLoaded = false;

	function scheduleAfterPageLoad(callback) {
		if (document.readyState === 'complete') {
			callback();
			return;
		}

		window.addEventListener('load', callback, { once: true });
	}

	function initializeGtag() {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};

		window.gtag('js', new Date());
		window.gtag('config', GA_MEASUREMENT_ID);
	}

	function loadGoogleTag() {
		if (analyticsLoaded) {
			return;
		}

		analyticsLoaded = true;
		const analyticsScript = document.createElement('script');
		analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		analyticsScript.defer = true;
		analyticsScript.async = false;
		analyticsScript.addEventListener('load', initializeGtag, { once: true });
		document.head.appendChild(analyticsScript);
	}

	scheduleAfterPageLoad(loadGoogleTag);
})();
