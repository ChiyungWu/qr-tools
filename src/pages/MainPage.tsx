import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QrMake from './QrMake';
import QrLoad from './QrLoad';
import QrScan from './QrScan';

const TABS = ['qr-make', 'qr-load', 'qr-scan'] as const;
type WorkMode = (typeof TABS)[number];

export function MainPage() {
  const { urlLang, urlMode } = useParams<{
    urlLang?: string;
    urlMode?: string;
  }>();

  const [workTab, setWorkTab] = useState<WorkMode>('qr-make');

  useEffect(() => {
    let newTab: WorkMode = 'qr-make';

    // 再判斷 :mode
    if (urlMode && (TABS as readonly string[]).includes(urlMode)) {
      newTab = urlMode as WorkMode;
    }

    setWorkTab(newTab);
  }, [urlLang, urlMode]);

  return (
    <div className="flex-1 p-4 flex flex-col items-center">
      {/* Tab 按鈕 */}
      <div className="flex gap-4 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${
              workTab === t ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setWorkTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 內容 */}
      <div className="w-full max-w-xl">
        <motion.div
          className={workTab === 'qr-make' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workTab === 'qr-make' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrMake />
        </motion.div>

        <motion.div
          className={workTab === 'qr-load' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workTab === 'qr-load' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrLoad />
        </motion.div>

        <motion.div
          className={workTab === 'qr-scan' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workTab === 'qr-scan' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrScan />
        </motion.div>
      </div>
    </div>
  );
}
