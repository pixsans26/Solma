import React from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../components/discovery/HomeHeader";
import HomeTabs from "../components/discovery/HomeTabs";

export default function MainLayout({ children }) {
  const location = useLocation();
  const path = location.pathname;

  // Routes that have their own full-page header (music sub-pages + new browse/detail/player pages)
  const isMusicSubPage = path.startsWith('/music/') || path.startsWith('/music-player');
  const isBrowsePage = path.startsWith('/browse/');
  const isDetailPage = path.startsWith('/movie/') || path.startsWith('/series/');
  const isPlayerPage = path.startsWith('/movie-player/') || path.startsWith('/series-player/');

  const hideNav =
    ['/login', '/signup', '/otp', '/onboarding', '/content-preferences', '/'].includes(path) ||
    isMusicSubPage ||
    isBrowsePage ||
    isDetailPage ||
    isPlayerPage ||
    path === '/edit-profile' ||
    path === '/watchlist' ||
    path === '/help';

  // Routes where we want to hide the horizontal category tabs
  const hideTabsRoutes = ['/search', '/profile', '/downloads', '/songs', '/music-videos', '/settings', '/subscriptions', '/edit-profile', '/watchlist', '/help', '/library', '/settings/personal-info', '/settings/security', '/settings/payment', '/settings/language', '/settings/update-password', '/notifications'];
  const showTabs = !hideTabsRoutes.includes(path);

  // Routes that have a top carousel/hero element (no extra top padding needed)
  const heroRoutes = ['/', '/home', '/movies', '/series', '/short-films', '/songs', '/music-videos'];
  const isHeroPage = heroRoutes.includes(path) || isMusicSubPage;

  return (
    <>
      {!hideNav && (
        <>
          <HomeHeader />
          {showTabs && <HomeTabs />}
        </>
      )}
      <div className={!hideNav && !isHeroPage ? (showTabs ? "pt-[135px]" : "pt-[75px]") : ""}>
        {children}
      </div>
    </>
  );
}
