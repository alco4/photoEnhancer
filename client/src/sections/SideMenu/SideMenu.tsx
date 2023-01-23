import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './sideMenu.module.scss';
import { FilterOptionSlider, FilterOptionSwitch, HistoryControl } from '../../components';
import SimpleBarReact from "simplebar-react";
import {
    ROTATION_KEY, DEFAULT_ROTATION, BRIGHTNESS_KEY,
    DEFAULT_BRIGHTNESS, CONTRAST_KEY, DEFAULT_CONTRAST,
    EXPOSURE_KEY, DEFAULT_EXPOSURE, GAMMA_KEY, DEFAULT_GAMMA,
    INVERT_KEY, DEFAULT_INVERT, QUALITY_KEY, DEFAULT_QUALITY
} from '../../constants';
import 'simplebar-react/dist/simplebar.min.css';

const SideMenu = ({ applyFilters, resetFilters }: any) => {
    const [rotation, setRotation] = useState<number>(DEFAULT_ROTATION)
    const [brightness, setBrightness] = useState<number>(DEFAULT_BRIGHTNESS)
    const [contrast, setContrast] = useState<number>(DEFAULT_CONTRAST)
    const [exposure, setExposure] = useState<number>(DEFAULT_EXPOSURE)
    const [gamma, setGamma] = useState<number>(DEFAULT_GAMMA)
    const [invert, setInvert] = useState<boolean>(DEFAULT_INVERT)
    const [quality, setQuality] = useState<number>(DEFAULT_QUALITY)
    const filterHistoryRef = useRef([])
    const filterHistoryIndexRef = useRef(0)

    useEffect(() => {
        resetAllFilters()
        filterHistoryIndexRef.current = 0
        filterHistoryRef.current = []
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetFilters])

    useEffect(() => {
        applyFilters(buildParams('', false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invert])

    const resetParam = (paramToReset: any) => {
        switch (paramToReset) {
            case ROTATION_KEY: setRotation(DEFAULT_ROTATION);
                break;
            case BRIGHTNESS_KEY: setBrightness(DEFAULT_BRIGHTNESS)
                break;
            case CONTRAST_KEY: setContrast(DEFAULT_CONTRAST)
                break;
            case EXPOSURE_KEY: setExposure(DEFAULT_EXPOSURE)
                break;
            case GAMMA_KEY: setGamma(DEFAULT_GAMMA)
                break;
            case INVERT_KEY: setInvert(DEFAULT_INVERT)
                break;
            case QUALITY_KEY: setQuality(DEFAULT_QUALITY)
                break;
        }
    }
    const handleOnChangeCheckbox = (paramToReset: string) => {
        resetParam(paramToReset)
        applyFilters(buildParams(paramToReset, true))
    }

    const handleOnChangeFilter = (e: any, filterKey: string) => {
        switch (filterKey) {
            case ROTATION_KEY: setRotation(e?.target?.value);
                break;
            case BRIGHTNESS_KEY: setBrightness(e?.target?.value)
                break;
            case CONTRAST_KEY: setContrast(e?.target?.value)
                break;
            case EXPOSURE_KEY: setExposure(e?.target?.value)
                break;
            case GAMMA_KEY: setGamma(e?.target?.value)
                break;
            case INVERT_KEY: setInvert(e.target.checked)
                break;
            case QUALITY_KEY: setQuality(e?.target?.value)
                break;
        }
    }

    const buildParams = useCallback((resetParam: string, addToHIstory: boolean) => {
        const paramsObj = {
            ...(resetParam !== ROTATION_KEY && rotation !== DEFAULT_ROTATION && { [ROTATION_KEY]: rotation }),
            ...(resetParam !== BRIGHTNESS_KEY && brightness !== DEFAULT_BRIGHTNESS && { [BRIGHTNESS_KEY]: brightness }),
            ...(resetParam !== CONTRAST_KEY && contrast !== DEFAULT_CONTRAST && { [CONTRAST_KEY]: contrast }),
            ...(resetParam !== EXPOSURE_KEY && exposure !== DEFAULT_EXPOSURE && { [EXPOSURE_KEY]: exposure }),
            ...(resetParam !== GAMMA_KEY && gamma !== DEFAULT_GAMMA && { [GAMMA_KEY]: gamma }),
            ...(resetParam !== INVERT_KEY && invert !== DEFAULT_INVERT && { [INVERT_KEY]: invert }),
            ...(resetParam !== QUALITY_KEY && quality !== DEFAULT_QUALITY && { [QUALITY_KEY]: quality }),
            w: 800, h: 600
        }

        if (addToHIstory) {
            const splittedHistory = filterHistoryRef.current.slice(0, filterHistoryIndexRef.current + 1)
            filterHistoryIndexRef.current = filterHistoryRef.current.length
            filterHistoryRef.current = [...splittedHistory, paramsObj]
        }

        return paramsObj
    }, [brightness, contrast, exposure, gamma, invert, quality, rotation])

    const defaultParams = () => { }

    const handleOnChangeCommitted = () => {
        applyFilters(buildParams('', true))
    }

    const resetAllFilters = useCallback(() => {
        setRotation(DEFAULT_ROTATION)
        setBrightness(DEFAULT_BRIGHTNESS)
        setContrast(DEFAULT_CONTRAST)
        setExposure(DEFAULT_EXPOSURE)
        setGamma(DEFAULT_GAMMA)
        setInvert(DEFAULT_INVERT)
        setQuality(DEFAULT_QUALITY)
        applyFilters(defaultParams())
    }, [applyFilters])


    const loadHistoryState = (newFilterHistoryIndex: number) => {
        filterHistoryIndexRef.current = newFilterHistoryIndex
        const paramsObj = filterHistoryRef.current[newFilterHistoryIndex]
        paramsObj[ROTATION_KEY] ? setRotation(paramsObj[ROTATION_KEY]) : setRotation(DEFAULT_ROTATION)
        paramsObj[BRIGHTNESS_KEY] ? setBrightness(paramsObj[BRIGHTNESS_KEY]) : setBrightness(DEFAULT_BRIGHTNESS)
        paramsObj[CONTRAST_KEY] ? setContrast(paramsObj[CONTRAST_KEY]) : setContrast(DEFAULT_CONTRAST)
        paramsObj[EXPOSURE_KEY] ? setExposure(paramsObj[EXPOSURE_KEY]) : setExposure(DEFAULT_EXPOSURE)
        paramsObj[GAMMA_KEY] ? setGamma(paramsObj[GAMMA_KEY]) : setGamma(DEFAULT_GAMMA)
        paramsObj[INVERT_KEY] ? setInvert(paramsObj[INVERT_KEY]) : setInvert(DEFAULT_INVERT)
        paramsObj[QUALITY_KEY] ? setInvert(paramsObj[QUALITY_KEY]) : setQuality(DEFAULT_QUALITY)
        applyFilters(paramsObj)
    }
    const handleOnUndo = () => {
        const newFilterHistoryIndex = filterHistoryIndexRef.current - 1
        if (newFilterHistoryIndex === -1) {
            return resetAllFilters()
        }
        loadHistoryState(newFilterHistoryIndex)
    }

    const handleOnRedo = () => {
        const newFilterHistoryIndex = filterHistoryIndexRef.current + 1
        if (newFilterHistoryIndex >= filterHistoryRef.current.length) {
            return
        }
        loadHistoryState(newFilterHistoryIndex)
    }
    return (
        <div className={styles.sideMenu}>
            <div className={styles.sideMenu__filterOptions}>
                <SimpleBarReact className={styles.sideMenu__filterBar} >
                    <FilterOptionSlider defaultValue={DEFAULT_ROTATION} value={rotation} min={0} max={360} paramKey={ROTATION_KEY} title="rotation" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_BRIGHTNESS} value={brightness} min={-100} max={100} paramKey={BRIGHTNESS_KEY} title="brightness" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_CONTRAST} value={contrast} min={-100} max={100} paramKey={CONTRAST_KEY} title="contrast" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_EXPOSURE} value={exposure} min={-100} max={100} paramKey={EXPOSURE_KEY} title="exposure" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_GAMMA} value={gamma} min={-100} max={100} paramKey={GAMMA_KEY} title="gamma" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSwitch title="invert" paramKey={INVERT_KEY} value={invert} onChangeFilter={handleOnChangeFilter} />
                    <div><h5>Output Quality</h5></div>
                    <FilterOptionSlider defaultValue={DEFAULT_QUALITY} value={quality} min={0} max={100} paramKey={QUALITY_KEY} title="quality" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={handleOnChangeFilter} onChangeCommited={handleOnChangeCommitted} />
                </SimpleBarReact>
            </div>
            <HistoryControl handleOnUndo={handleOnUndo} handleOnRedo={handleOnRedo} />
        </div>
    )
};
export default SideMenu;
