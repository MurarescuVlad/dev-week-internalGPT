import styles from './UploadedFile.module.css';

import fileIcon from '../../../assets/file.png';
import removeIcon from '../../../assets/remove.png';

interface IProps {
  currentFile: File | null;
  handleRemoveFile: () => void;
}

const UploadedFile = ({
  currentFile,
  handleRemoveFile,
}: IProps) => {

  if (!currentFile) return null;

  return (
    <div className={styles.questionFilesContainer}>
      <div className={styles.fileCard}>
        <img
          src={fileIcon}
          alt=""
          height={28}
        />
        <div className={styles.fileCardContent}>{currentFile.name}</div>
        <img
          className={styles.removeFileIcon}
          src={removeIcon}
          alt=""
          height={25}
          onClick={() => handleRemoveFile()}
        />
      </div>
    </div>
  );
};

export default UploadedFile;