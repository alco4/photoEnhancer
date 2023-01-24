import { useEffect, useCallback, useRef, useReducer } from 'react'
import { FilterOptionSlider, FilterOptionSwitch, HistoryControl } from '../../components';
import SimpleBarReact from "simplebar-react";
import {
    ROTATION_KEY, DEFAULT_ROTATION, BRIGHTNESS_KEY,
    DEFAULT_BRIGHTNESS, CONTRAST_KEY, DEFAULT_CONTRAST,
    EXPOSURE_KEY, DEFAULT_EXPOSURE, GAMMA_KEY, DEFAULT_GAMMA,
    INVERT_KEY, QUALITY_KEY, DEFAULT_QUALITY, DEFAULT_FILTER_VALUES
} from '../../constants';
import styles from './sideMenu.module.scss';
import 'simplebar-react/dist/simplebar.min.css';

const filtersReducer = (state: any, action: { type: string; value: number | boolean }) => {
    switch (action.type) {
        case action.type:
            return {
                ...state,
                [action.type]: action.value
            }
        default:
            return state;
    }
}

const SideMenu = ({ applyFilters, resetFilters }: any) => {
    const filterHistoryRef = useRef([DEFAULT_FILTER_VALUES])
    const filterHistoryIndexRef = useRef(0)
    const [filtersState, dispatch] = useReducer(filtersReducer, DEFAULT_FILTER_VALUES);
    const defaultParams = () => { }

    useEffect(() => {
        resetAllFilters()
        filterHistoryIndexRef.current = 0
        filterHistoryRef.current = [DEFAULT_FILTER_VALUES]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetFilters])

    useEffect(() => {
        applyFilters(buildParams('', false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtersState[INVERT_KEY]])


    const addHistoryRef = () => {
        const splittedHistory = filterHistoryRef.current.slice(0, filterHistoryIndexRef.current + 1)
        filterHistoryIndexRef.current = filterHistoryRef.current.length
        filterHistoryRef.current = [...splittedHistory, filtersState]
    }

    function removeUnusedParams(params, resetParam) {
        for (let filter in filtersState) {
            const isDefaultValue = filtersState[filter] === DEFAULT_FILTER_VALUES[filter]
            if (!isDefaultValue && filter !== resetParam) {
                params[filter] = filtersState[filter]
            }
        }
    }

    const buildParams = (resetParam: string, addToHIstory: boolean) => {
        const initialValues = { w: 800, h: 600 };
        const params = { ...initialValues }
        removeUnusedParams(params, resetParam)
        addToHIstory && addHistoryRef()
        return params
    }

    const loadHistoryState = (newFilterHistoryIndex: number) => {
        filterHistoryIndexRef.current = newFilterHistoryIndex
        const historyFilterData = filterHistoryRef.current[newFilterHistoryIndex]
        const params = {}
        for (const filter in historyFilterData) {
            params[filter] = historyFilterData[filter]
            handleChangeFilter(filter, historyFilterData[filter])
        }
        applyFilters(params)
    }

    const resetParam = (paramToReset: string) => {
        handleChangeFilter(paramToReset, DEFAULT_FILTER_VALUES[paramToReset])
    }

    const resetAllFilters = useCallback(() => {
        for (const filter in filtersState) {
            handleChangeFilter(filter, DEFAULT_FILTER_VALUES[filter])
        }
        applyFilters(defaultParams())
    }, [applyFilters, filtersState])

    const handleOnChangeCheckbox = (paramToReset: string) => {
        resetParam(paramToReset)
        applyFilters(buildParams(paramToReset, true))
    }

    const handleChangeFilter = (type: string, value: number | boolean) => {
        dispatch({ type, value });
    }

    const handleOnUndo = () => {
        const newFilterHistoryIndex = filterHistoryIndexRef.current - 1
        if (newFilterHistoryIndex < 0) {
            return
        }
        loadHistoryState(newFilterHistoryIndex)
    }

    const handleOnRedo = () => {
        const newFilterHistoryIndex = filterHistoryIndexRef.current + 1
        if (newFilterHistoryIndex === filterHistoryRef.current.length) {
            return
        }
        loadHistoryState(newFilterHistoryIndex)
    }

    const handleOnChangeCommitted = () => {
        applyFilters(buildParams('', true))
    }

    return (
        <div className={styles.sideMenu}>
            <div className={styles.sideMenu__filterOptions}>
                <SimpleBarReact className={styles.sideMenu__filterBar} >
                    <FilterOptionSlider defaultValue={DEFAULT_ROTATION} value={filtersState[ROTATION_KEY]} min={0} max={360} paramKey={ROTATION_KEY} title="rotation" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(ROTATION_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_BRIGHTNESS} value={filtersState[BRIGHTNESS_KEY]} min={-100} max={100} paramKey={BRIGHTNESS_KEY} title="brightness" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(BRIGHTNESS_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_CONTRAST} value={filtersState[CONTRAST_KEY]} min={-100} max={100} paramKey={CONTRAST_KEY} title="contrast" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(CONTRAST_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_EXPOSURE} value={filtersState[EXPOSURE_KEY]} min={-100} max={100} paramKey={EXPOSURE_KEY} title="exposure" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(EXPOSURE_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSlider defaultValue={DEFAULT_GAMMA} value={filtersState[GAMMA_KEY]} min={-100} max={100} paramKey={GAMMA_KEY} title="gamma" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(GAMMA_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                    <FilterOptionSwitch title="invert" paramKey={INVERT_KEY} value={filtersState[INVERT_KEY]} onChangeFilter={e => handleChangeFilter(INVERT_KEY, e.target.checked)} />
                    <div><h5>Output Quality</h5></div>
                    <FilterOptionSlider defaultValue={DEFAULT_QUALITY} value={filtersState[QUALITY_KEY]} min={0} max={100} paramKey={QUALITY_KEY} title="quality" onChangeCheckbox={handleOnChangeCheckbox} onChangeFilter={e => handleChangeFilter(QUALITY_KEY, e.target.value)} onChangeCommited={handleOnChangeCommitted} />
                </SimpleBarReact>
            </div>
            <HistoryControl handleOnUndo={handleOnUndo} handleOnRedo={handleOnRedo} />
        </div>
    )
};
export default SideMenu;
