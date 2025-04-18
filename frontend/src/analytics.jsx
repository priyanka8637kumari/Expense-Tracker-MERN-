import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  ReactGA.initialize("G-XZ5891R0G0", { debug: true });
};

export const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
}