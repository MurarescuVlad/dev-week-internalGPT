import { ChangeEvent, useRef } from 'react';

import styles from './FileUploadButton.module.css';

import { supportedFileExtensions } from '../../../constants/constants';

import attachment from '../../../assets/attachment.png';

interface IProps {
  disabled: Boolean;
  fileInputRef: React.RefObject<HTMLInputElement>
  handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadButton = ({
  disabled,
  fileInputRef,
  handleFileInputChange,
}: IProps) => {

  return (
    <div className={styles.attachButton}>
      <img
        className={disabled ? styles.disabledState : styles.iconActiveStyle}
        onClick={() => !disabled && fileInputRef?.current?.click()}
        src={attachment}
        alt=""
        width={27}
        height={27}
      />
      <input
        className={styles.fileInput}
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={supportedFileExtensions.join(', ')}
      />
    </div>
  )
};

export default FileUploadButton;