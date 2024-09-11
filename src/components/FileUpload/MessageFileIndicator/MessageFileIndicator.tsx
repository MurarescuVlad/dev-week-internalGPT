import styles from './MessageFileIndicator.module.css';

import fileIcon from '../../../assets/file.png';

interface IProps {
  fileName: string | undefined;
}

const MessageFileIndicator = ({
  fileName,
}: IProps) => {
  if (!fileName) return null;

  return (
    <div className={styles.fileNameContainer}>
      <img src={fileIcon} alt="" height={25} />
      <div className={styles.fileCardContent}>{fileName}</div>
    </div>
  );
};

export default MessageFileIndicator;