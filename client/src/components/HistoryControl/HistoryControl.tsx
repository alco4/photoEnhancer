import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import styles from './historyControl.module.scss'

const HistoryControl = ({ handleOnUndo, handleOnRedo }: { handleOnUndo: () => void, handleOnRedo: () => void }) => {
    return (
        <div className={styles.historyControl}>
            <div className={styles.historyControl__option} onClick={handleOnUndo}>
                <div className={styles.historyControl__ico}>
                    <UndoIcon />
                </div>
                <p>Undo</p>
            </div>
            <div className={styles.historyControl__option} onClick={handleOnRedo}>
                <div className={styles.historyControl__ico}>
                    <RedoIcon />
                </div>
                <p>Redo</p>
            </div>
        </div>
    )
}

export default HistoryControl