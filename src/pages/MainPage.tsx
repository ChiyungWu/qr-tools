import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import clsx from 'clsx';
import i18n from '@/i18n';

import QrMake from './QrMake';
import QrLoad from './QrLoad';
import QrScan from './QrScan';

const LIST_QrMode = ['qr-make', 'qr-load', 'qr-scan'] as const;
type TYPE_QrMode = (typeof LIST_QrMode)[number];

function getUrlMode() {
  const path = window.location.pathname || '';
  const urlMode = path.split('/')[2] || '';
  if (LIST_QrMode.includes(urlMode as TYPE_QrMode)) {
    return urlMode;
  }
  return 'qr-make';
}

export function MainPage() {
  const [workMode, setWorkMode] = useState(getUrlMode());

  useEffect(() => {
    window.history.replaceState(null, '', `/${i18n.language}/${workMode}`);
  }, [workMode]);

  return (
    <div className="flex-1 p-8 flex flex-col items-center">
      {/* Tab 按鈕 */}
      <div className="flex gap-4 mb-4">
        {LIST_QrMode.map((t) => (
          <button
            key={t}
            className={clsx(
              'px-4 py-2 rounded',
              'border border-black',
              'dark:border-white dark:text-white',
              workMode === t ? 'bg-blue-500 text-white' : 'bg-gray-200'
            )}
            onClick={() => setWorkMode(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 內容 */}
      <div className="w-full max-w-xl">
        <motion.div
          className={workMode === 'qr-make' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workMode === 'qr-make' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrMake />
        </motion.div>

        <motion.div
          className={workMode === 'qr-load' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workMode === 'qr-load' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrLoad />
        </motion.div>

        <motion.div
          className={workMode === 'qr-scan' ? 'block' : 'hidden'}
          initial={{ opacity: 0 }}
          animate={{ opacity: workMode === 'qr-scan' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <QrScan />
        </motion.div>
      </div>
    </div>
  );
}
