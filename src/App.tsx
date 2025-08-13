import i18n from '@/i18n';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/navbar/Navbar';
import { MainPage } from '@/pages/MainPage';
import { Footer } from '@/components/footer/Footer';

function RedirectWithLang() {
  const { tab } = useParams<{ tab: string }>();
  const webLang = i18n.language;
  return <Navigate to={`/${webLang}/${tab}`} replace />;
}

export function App() {
  const webLang = i18n.language;

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* 預設導向 qr-make */}
        <Route
          path="/"
          element={<Navigate to={`/${webLang}/qr-make`} replace />}
        />

        {/* 只有 tab，補上語言 */}
        <Route path="/:tab" element={<RedirectWithLang />} />

        {/* 三個 tab 頁面 */}
        <Route path="/:lang/:tab" element={<MainPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to={`/${webLang}/qr-make`} replace />}
        />
      </Routes>
      <Footer />
    </>
  );
}
