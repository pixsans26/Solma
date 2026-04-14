import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import BottomNav from './components/navigation/BottomNav';
import MiniPlayer from './components/player/MiniPlayer';
import SongOptionsSheet from './components/player/SongOptionsSheet';
import { MusicProvider } from './context/MusicContext';

import { Login, Signup, OTP } from './pages/auth/AuthPages';
import { SplashScreen, Onboarding, ContentPreferences } from './pages/auth/Onboarding';
import Home from './pages/home/Home';
import SearchPage from './pages/search/SearchPage';

// Content Pages
import Movies from './pages/content/Movies';
import Series from './pages/content/Series';
import ShortFilms from './pages/content/ShortFilms';
import Songs from './pages/content/Songs';
import MusicVideos from './pages/content/MusicVideos';

// Account Pages
import Profile from './pages/account/Profile';
import Downloads from './pages/account/Downloads';
import { Settings, Subscriptions } from './pages/account/AccountMisc';
import EditProfile from './pages/account/EditProfile';
import Watchlist from './pages/account/Watchlist';
import HelpSupport from './pages/account/HelpSupport';
import Checkout from './pages/account/Checkout';
import PaymentSuccess from './pages/account/PaymentSuccess';
import MyLibrary from './pages/account/MyLibrary';

// Music Player & List
import MusicPlayer from './pages/content/MusicPlayer';
import MusicListPage from './pages/content/MusicListPage';

// ─── NEW PAGES ──────────────────────────────────────────────────────────────
import CategoryPage from './pages/browse/CategoryPage';
import GenrePage from './pages/browse/GenrePage';
import ViewAllPage from './pages/browse/ViewAllPage';
import MovieDetail from './pages/content/MovieDetail';
import SeriesDetail from './pages/content/SeriesDetail';
import MoviePlayerPage from './pages/content/MoviePlayer';
import SeriesPlayerPage from './pages/content/SeriesPlayer';

// Setting Details
import { PersonalInfo, Security, PaymentMethods, Language, UpdatePassword } from './pages/account/SettingDetails';

function AppContent() {
  return (
    <div className="w-full max-w-[480px] mx-auto bg-ott-bg text-ott-text font-inter shadow-ott-hero flex flex-col relative min-h-screen overflow-x-hidden">
      <MusicProvider>
        <Routes>
          <Route path="/music-player/:id" element={<MusicPlayer />} />
          <Route path="/movie-player/:id" element={<MoviePlayerPage />} />
          <Route path="/series-player/:id/:season/:episode" element={<SeriesPlayerPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/*" element={<MainFlow />} />
        </Routes>
        <SongOptionsSheet />
      </MusicProvider>
    </div>
  );
}

function MainFlow() {
  const location = useLocation();
  const hideBottomNav = ['/', '/onboarding', '/content-preferences', '/login', '/signup', '/otp'].includes(location.pathname);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/content-preferences" element={<ContentPreferences />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/short-films" element={<ShortFilms />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/music-videos" element={<MusicVideos />} />
          <Route path="/music/:type/:name" element={<MusicListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/personal-info" element={<PersonalInfo />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/payment" element={<PaymentMethods />} />
          <Route path="/settings/language" element={<Language />} />
          <Route path="/settings/update-password" element={<UpdatePassword />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/browse/category/:category" element={<CategoryPage />} />
          <Route path="/browse/genre/:genre" element={<GenrePage />} />
          <Route path="/browse/all/:section" element={<ViewAllPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
      {!hideBottomNav && (
        <>
          <MiniPlayer />
          <BottomNav />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
