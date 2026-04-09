(function () {
	const GA_MEASUREMENT_ID = 'G-T2TYZW69XZ';
	let analyticsStatus = 'idle';
	let hasRegisteredVisibilityListener = false;
	const interactionListeners = [];

	function initializeGtag() {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};

		window.gtag('js', new Date());
		window.gtag('config', GA_MEASUREMENT_ID);
	}

	function removeInteractionListeners() {
		for (const [target, eventName, listener, options] of interactionListeners) {
			target.removeEventListener(eventName, listener, options);
		}

		interactionListeners.length = 0;
	}

	function loadGoogleTag() {
		if (analyticsStatus !== 'idle') {
			return;
		}

		analyticsStatus = 'loading';
		removeInteractionListeners();

		const analyticsScript = document.createElement('script');
		analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		analyticsScript.async = true;
		analyticsScript.addEventListener(
			'load',
			() => {
				analyticsStatus = 'loaded';
				initializeGtag();
			},
			{ once: true }
		);
		analyticsScript.addEventListener(
			'error',
			() => {
				analyticsStatus = 'idle';
			},
			{ once: true }
		);
		document.head.appendChild(analyticsScript);
	}

	function addInteractionListener(target, eventName, options = undefined) {
		target.addEventListener(eventName, loadGoogleTag, options);
		interactionListeners.push([target, eventName, loadGoogleTag, options]);
	}

	function registerInteractionTriggers() {
		addInteractionListener(window, 'pointerdown', { once: true, passive: true });
		addInteractionListener(window, 'keydown', { once: true });
		addInteractionListener(window, 'scroll', { once: true, passive: true });
		addInteractionListener(window, 'touchstart', { once: true, passive: true });
	}

	function scheduleIdleAnalytics() {
		const schedule = () => {
			if (document.visibilityState !== 'visible') {
				if (!hasRegisteredVisibilityListener) {
					hasRegisteredVisibilityListener = true;
					document.addEventListener(
						'visibilitychange',
						() => {
							hasRegisteredVisibilityListener = false;
							scheduleIdleAnalytics();
						},
						{ once: true }
					);
				}
				return;
			}

			if ('requestIdleCallback' in window) {
				window.requestIdleCallback(loadGoogleTag, { timeout: 5000 });
				return;
			}

			window.setTimeout(loadGoogleTag, 3500);
		};

		if (document.readyState === 'complete') {
			schedule();
			return;
		}

		window.addEventListener('load', schedule, { once: true });
	}

	registerInteractionTriggers();
	scheduleIdleAnalytics();
})();
