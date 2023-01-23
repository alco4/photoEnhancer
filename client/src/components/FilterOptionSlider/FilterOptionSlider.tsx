import { Slider as SliderMui, Checkbox } from "@mui/material";
import styles from "./filterOptionSlider.module.scss";

interface FilterOptionSliderType {
    defaultValue: number;
    value: number;
    min: number;
    max: number;
    paramKey: string;
    title: string;
    onChangeCheckbox: (paramToReset: string) => void;
    onChangeFilter: (e: any, filterKey: string) => void;
    onChangeCommited: () => void;
}
const FilterOptionSlider =
    ({ defaultValue, value, min, max, paramKey, title, onChangeCheckbox,
        onChangeFilter, onChangeCommited }: FilterOptionSliderType) => {

        return (
            <div className={styles.filterOptionSlider}>
                <div className={styles.filterOptionSlider__header}>
                    <p className={styles.filterOptionSlider__title}>{title}</p>
                    <Checkbox checked={value !== defaultValue} size="small" onChange={() => onChangeCheckbox(paramKey)} />
                </div>
                <SliderMui
                    aria-label="rotation"
                    defaultValue={defaultValue}
                    valueLabelDisplay="auto"
                    value={value}
                    step={1}
                    marks
                    min={min}
                    max={max}
                    onChange={e => onChangeFilter(e, paramKey)}
                    onChangeCommitted={onChangeCommited}
                    size="small"
                />
            </div >
        )
    }

export default FilterOptionSlider