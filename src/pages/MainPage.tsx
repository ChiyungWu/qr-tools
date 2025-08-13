import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import i18n from "@/i18n"; // 請確保路徑正確
import QrMake from "./QrMake";
import QrLoad from "./QrLoad";
import QrScan from "./QrScan";

const TABS = ["qr-make", "qr-load", "qr-scan"];

export function MainPage() {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  // 語言直接從 i18n.language 取，並取前段短碼
  const lang = i18n.language.split("-")[0];

  // 如果 URL 中的 tab 無效，預設到 qr-make
  useEffect(() => {
    if (!TABS.includes(tab || "")) {
      navigate(`/qr-make`, { replace: true });
    }
  }, [tab, navigate]);

  const activeTab = TABS.includes(tab || "") ? tab : "qr-make";

  return (
    <div className="p-4">
      {/* Tab 按鈕 */}
      <div className="flex gap-4 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => navigate(`/${t}`)}
            className={`px-4 py-2 rounded ${
              activeTab === t ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {t} ({lang})
          </button>
        ))}
      </div>

      {/* 三個內容一次渲染，僅 show/hide */}
      <motion.div
        className={activeTab === "qr-make" ? "block" : "hidden"}
        initial={{ opacity: 0 }}
        animate={{ opacity: activeTab === "qr-make" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <QrMake />
      </motion.div>

      <motion.div
        className={activeTab === "qr-load" ? "block" : "hidden"}
        initial={{ opacity: 0 }}
        animate={{ opacity: activeTab === "qr-load" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <QrLoad />
      </motion.div>

      <motion.div
        className={activeTab === "qr-scan" ? "block" : "hidden"}
        initial={{ opacity: 0 }}
        animate={{ opacity: activeTab === "qr-scan" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <QrScan />
      </motion.div>
    </div>
  );
}
