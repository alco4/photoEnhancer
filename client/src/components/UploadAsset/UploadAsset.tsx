import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';

const UploadAsset = ({ onChangeUploadFile, uploadButtonRef }: { onChangeUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void, uploadButtonRef: React.RefObject<HTMLInputElement> }) => {
    return (
        <>
            <FileUploadIcon />
            Upload
            <input ref={uploadButtonRef} style={{ display: 'none' }} type="file" onChange={onChangeUploadFile} />
        </>
    )
}

export default UploadAsset