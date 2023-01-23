import { useRef } from "react";
import { saveAs } from "file-saver";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import styles from './actionButtons.module.scss'
import UploadAsset from "../UploadAsset";

const ActionButtons = ({ url, onChangeUploadFile }: { url: string, onChangeUploadFile: (file: File) => void }) => {
    const uploadButtonRef = useRef(null)

    const handleClickUploadFile = (e: { preventDefault: () => void; }) => {
        uploadButtonRef.current.click()
    }

    const handleOnChangeUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeUploadFile(e.target.files[0]);
    }

    const handleOnCopy = (e: { preventDefault: () => void; }) => {
        e?.preventDefault()
        navigator.clipboard.writeText(url)
    }

    const handleDownload = () => {
        saveAs(url, "filteredImg");
    }

    return (
        <div className={styles.actionButtonsContainer}>
            <div className={styles.actionButton} onClick={handleClickUploadFile}>
                <UploadAsset onChangeUploadFile={handleOnChangeUploadFile} uploadButtonRef={uploadButtonRef} />
            </div>
            <div className={styles.actionButton} onClick={handleOnCopy}>
                <ContentCopyIcon />
                Copy Url
            </div>
            <div className={styles.actionButton} onClick={handleDownload}>
                <FileDownloadIcon />
                Download
            </div>
        </div>
    )
}

export default ActionButtons