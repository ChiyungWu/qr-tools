import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import { LIST_Lang, type TYPE_Lang } from '@/config/TYPE_Lang';
import { useSwitchLang } from '@/hooks/useSwitchLang';

interface ModalProps_WebLang {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export function WebLangMenu({ isModalOpen, onCloseModal }: ModalProps_WebLang) {
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const switchLang = useSwitchLang();
  const showKnownName = true;

  const onClickLang = (nextLang: TYPE_Lang) => {
    onCloseModal();
    switchLang(nextLang);
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsActive(false);
      const timer = setTimeout(() => setIsVisible(false), 240);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'bg-gray-500 bg-opacity-50',
        'flex justify-center items-center'
      )}
      onClick={onCloseModal}
    >
      <div
        className={clsx(
          'min-w-[250px] p-6 rounded shadow-lg',
          'max-h-[80vh] overflow-y-auto',
          'bg-blue-600 text-white',
          'transform transition-transform duration-300',
          isActive ? 'translate-y-0' : '-translate-y-[250%]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{t('selectLanguage')}</h2>
        <hr className="my-4" />
        <ul className="space-y-2">
          {LIST_Lang.map((nextLang) => (
            <li key={nextLang}>
              <button
                onClick={() => onClickLang(nextLang as TYPE_Lang)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded',
                  'hover:font-bold hover:bg-yellow-500 hover:text-black',
                  {
                    'font-bold bg-white text-blue-500':
                      i18n.language === nextLang,
                  }
                )}
              >
                {t(`lang_local_name.${nextLang}`)}
                {showKnownName && nextLang !== 'en' && (
                  <>
                    <br />
                    {t(`lang_known_name.${nextLang}`)}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
