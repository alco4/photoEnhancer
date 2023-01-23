import { useContext, useEffect, useState } from 'react';
import { buildURL } from 'react-imgix';
import { DarkModeContext } from './context/DarkModeProvider'
import { Gallery, SideMenu, PhotoPreview } from './sections';
import { DEFAULT_PREVIEW_IMG } from './constants';
import styles from './app.module.scss';
import AppHeader from './sections/AppHeader';

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext)
  const [baseImg, setBaseImg] = useState(DEFAULT_PREVIEW_IMG)
  const [filterParams, setFilterParams] = useState({})
  const [resetFilters, setResetFilters] = useState(false)
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => setImgUrl(buildURL(baseImg, filterParams)), [baseImg, filterParams])

  useEffect(() => setImgUrl(buildURL(baseImg, filterParams)), [baseImg, filterParams])

  const applyFilters = (params: {}) => {
    setFilterParams(params)
  }

  const handleToggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleOnClickGalleryImg = (e: React.MouseEvent<HTMLDivElement>, val: string) => {
    e.stopPropagation()
    setBaseImg(val)
    setResetFilters(!resetFilters)
  }

  const handleOnUploadAsset = (assetUrl) => setBaseImg(assetUrl)

  return (
    <div
      className={`${styles.mainContainer} ${isDarkMode && styles.darkModeTheme}`}
    >
      <AppHeader
        handleToggleDarkMode={handleToggleDarkMode}
      />
      <div className={styles.flexContainer}>
        <SideMenu applyFilters={applyFilters} resetFilters={resetFilters} />
        <div className={styles.appContent}>
          <PhotoPreview imgUrl={imgUrl} onUploadAsset={handleOnUploadAsset} />
          <Gallery onClick={handleOnClickGalleryImg} />
        </div>
      </div>
    </div>
  );
}

export default App;
