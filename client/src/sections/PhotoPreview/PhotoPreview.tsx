import { useEffect, useState } from 'react';
import { ActionButtons } from '../../components';
import loadingGif from '../../assets/img/loading.gif'
import styles from './photoPreview.module.scss'
import { USER_ASSETS_URL } from '../../constants';
import { uploadFileApi } from '../../services'

const PhotoPreview = ({ imgUrl, onUploadAsset }: { imgUrl: string, onUploadAsset: (imgUrl: string) => void }) => {
    const [uploadFile, setUploadFile] = useState<File>(null);
    const [loading, setLoading] = useState(false);

    const photo = <img src={loadingGif} data-src={imgUrl} hidden={loading && true} className={`${styles.photoPreview__photo} lazyload`} alt="photoPreview" loading="lazy" />

    const handleOnChangeUploadFile = (file: File) => {
        setUploadFile(file);
    }

    useEffect(() => {
        async function callApi() {
            setLoading(true)
            const imgName = await uploadFileApi(uploadFile)
            onUploadAsset(`${USER_ASSETS_URL}/${imgName}`)
        }

        try {
            uploadFile && callApi()
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadFile])

    useEffect(() => {
        setLoading(false)
    }, [imgUrl])

    return (
        <div className={styles.photoPreview}>
            {loading && <img style={{ width: '20rem' }} src={loadingGif} alt="loadingGif" />}
            {photo}
            <ActionButtons url={imgUrl} onChangeUploadFile={handleOnChangeUploadFile} />
        </div>
    )
};

export default PhotoPreview
