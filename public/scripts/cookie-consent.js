(function () {
	const GA_MEASUREMENT_ID = 'G-T2TYZW69XZ';
	const CONSENT_STORAGE_KEY = 'cookie-consent-choice-v1';
	const CONSENT_COOKIE_KEY = 'cookie_consent_choice_v1';
	const CONSENT_ACCEPTED = 'accepted';
	const CONSENT_REJECTED = 'rejected';
	const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
	const BANNER_ID = 'cookie-consent-banner';
	const CONSENT_EVENT = 'cookie-consent:updated';

	let analyticsLoaded = false;
	let waitingForPageLoad = false;

	function isValidConsent(value) {
		return value === CONSENT_ACCEPTED || value === CONSENT_REJECTED;
	}

	function getCookie(name) {
		const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
		return match ? decodeURIComponent(match[1]) : null;
	}

	function setCookie(name, value, maxAgeSeconds) {
		const parts = [
			encodeURIComponent(name) + '=' + encodeURIComponent(value),
			'Path=/',
			'SameSite=Lax',
			'Max-Age=' + String(maxAgeSeconds),
		];

		if (window.location.protocol === 'https:') {
			parts.push('Secure');
		}

		document.cookie = parts.join('; ');
	}

	function removeAnalyticsCookies() {
		const names = document.cookie
			.split(';')
			.map((entry) => entry.trim().split('=')[0])
			.filter((name) => name.startsWith('_ga'));

		for (const name of names) {
			document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
		}
	}

	function getStoredConsent() {
		try {
			const localValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
			if (isValidConsent(localValue)) {
				return localValue;
			}
		} catch {
			// Continue with cookie fallback.
		}

		const cookieValue = getCookie(CONSENT_COOKIE_KEY);
		if (isValidConsent(cookieValue)) {
			return cookieValue;
		}

		return null;
	}

	function dispatchConsentUpdate(status) {
		window.dispatchEvent(
			new CustomEvent(CONSENT_EVENT, {
				detail: {
					status,
				},
			})
		);
	}

	function setStoredConsent(status) {
		if (!isValidConsent(status)) {
			return;
		}

		try {
			window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
		} catch {
			// Ignore storage errors.
		}

		setCookie(CONSENT_COOKIE_KEY, status, CONSENT_COOKIE_MAX_AGE);
		dispatchConsentUpdate(status);
	}

	function getBanner() {
		const banner = document.getElementById(BANNER_ID);
		return banner instanceof HTMLElement ? banner : null;
	}

	function hideBanner() {
		const banner = getBanner();
		if (banner) {
			banner.hidden = true;
		}
	}

	function bindBannerActions(banner) {
		if (banner.dataset.cookieConsentBound === 'true') {
			return;
		}

		const acceptButton = banner.querySelector('[data-cookie-consent-action="accept"]');
		const rejectButton = banner.querySelector('[data-cookie-consent-action="reject"]');

		if (acceptButton instanceof HTMLButtonElement) {
			acceptButton.addEventListener('click', () => {
				acceptConsent();
				hideBanner();
			});
		}

		if (rejectButton instanceof HTMLButtonElement) {
			rejectButton.addEventListener('click', () => {
				rejectConsent();
				hideBanner();
			});
		}

		banner.dataset.cookieConsentBound = 'true';
	}

	function showBanner() {
		const banner = getBanner();
		if (!banner) {
			return;
		}

		bindBannerActions(banner);
		banner.hidden = false;
	}

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
		window['ga-disable-' + GA_MEASUREMENT_ID] = false;

		const analyticsScript = document.createElement('script');
		analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		analyticsScript.defer = true;
		analyticsScript.async = false;
		analyticsScript.addEventListener('load', initializeGtag, { once: true });
		document.head.appendChild(analyticsScript);
	}

	function maybeLoadAnalytics() {
		if (getStoredConsent() !== CONSENT_ACCEPTED) {
			return;
		}

		if (waitingForPageLoad) {
			return;
		}

		waitingForPageLoad = true;
		scheduleAfterPageLoad(() => {
			waitingForPageLoad = false;
			if (getStoredConsent() === CONSENT_ACCEPTED) {
				loadGoogleTag();
			}
		});
	}

	function acceptConsent() {
		setStoredConsent(CONSENT_ACCEPTED);
		window['ga-disable-' + GA_MEASUREMENT_ID] = false;
		maybeLoadAnalytics();
	}

	function rejectConsent() {
		setStoredConsent(CONSENT_REJECTED);
		window['ga-disable-' + GA_MEASUREMENT_ID] = true;
		removeAnalyticsCookies();
	}

	window.openCookiePreferences = function openCookiePreferences() {
		showBanner();
	};

	window.cookieConsent = {
		accept: acceptConsent,
		reject: rejectConsent,
		open: showBanner,
		getStatus: getStoredConsent,
	};

	const banner = getBanner();
	if (banner) {
		bindBannerActions(banner);
	}

	const consent = getStoredConsent();

	if (consent === CONSENT_ACCEPTED) {
		maybeLoadAnalytics();
	} else if (consent === CONSENT_REJECTED) {
		rejectConsent();
	} else {
		showBanner();
	}
})();
