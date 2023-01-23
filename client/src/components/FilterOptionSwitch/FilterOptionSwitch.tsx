import { Switch } from "@mui/material";
import styles from './filterOptionSwitch.module.scss'

interface FilterOptionSwitchType {
    title: string;
    paramKey: string;
    value: boolean;
    onChangeFilter: (e: any, filterKey: string) => void;
}

const FilterOptionSwitch = ({ title, paramKey, value, onChangeFilter }: FilterOptionSwitchType) => {
    return (
        <div>
            <span className={styles.title}>{title}</span>
            <Switch checked={value} onChange={e => onChangeFilter(e, paramKey)} />
        </div>
    )
}
export default FilterOptionSwitch