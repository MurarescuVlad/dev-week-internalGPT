import { useRef, useState, ChangeEvent, useEffect } from 'react'
import { Stack, TextField } from '@fluentui/react'
import { SendRegular } from '@fluentui/react-icons'

import Send from '../../assets/Send.svg'

import styles from './QuestionInput.module.css'
import { supportedFileExtensions } from '../../constants/constants';
import FileUploadButton from '../FileUpload/FileUploadButton/FileUploadButton';
import { toast } from 'react-toastify';
import UploadedFile from '../FileUpload/UploadedFile/UploadedFile';

interface Props {
  onSend: (question: string, id?: string, file?: File | null) => void
  disabled: boolean
  placeholder?: string
  clearOnSend?: boolean
  conversationId?: string
}

export const QuestionInput = ({
  onSend,
  disabled,
  placeholder,
  clearOnSend,
  conversationId,
}: Props) => {
  const [question, setQuestion] = useState<string>('')
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)


  const sendQuestion = () => {
    if (disabled || !question.trim()) {
      return
    }
    // File Upload
    if (conversationId) {
      onSend(question, conversationId, currentFile)
    } else {
      onSend(question, undefined, currentFile)
    }

    handleRemoveFile();

    if (clearOnSend) {
      setQuestion('')
    }
  }

  // FILE UPLOAD
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileExtension = file?.name?.split('.').pop() || '';

    if (supportedFileExtensions.includes(`.${fileExtension}`)) {
      setCurrentFile(file || null);
    } else {
      setCurrentFile(null);
      e.target.value = '';
      toast.error(`Supported file extensions are ${supportedFileExtensions.join(', ')}.`, {
        className: styles.toastCustomStyle,
        position: 'top-right',
        pauseOnHover: true,
        autoClose: 6000,
      });
    }
  }

  const handleRemoveFile = () => {
    setCurrentFile(null);
    if (fileInputRef?.current?.value) fileInputRef.current.value = '';
  }

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === 'Enter' && !ev.shiftKey && !(ev.nativeEvent?.isComposing === true)) {
      ev.preventDefault()
      sendQuestion()
    }
  }

  const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setQuestion(newValue || '')
  }

  const sendQuestionDisabled = disabled || !question.trim()

  return (
    <>
      {/* FILE UPLOAD */}
      {/* <UploadedFile
        currentFile={currentFile}
        handleRemoveFile={handleRemoveFile}
      /> */}
      <Stack horizontal className={styles.questionInputContainer}>
        {/* FILE UPLOAD */}
        {/* <FileUploadButton
          disabled={disabled}
          handleFileInputChange={handleFileInputChange}
        /> */}
        <TextField
          className={styles.questionInputTextArea}
          placeholder={placeholder}
          multiline
          resizable={false}
          borderless
          value={question}
          onChange={onQuestionChange}
          onKeyDown={onEnterPress}
        />
        <div
          className={styles.questionInputSendButtonContainer}
          role="button"
          tabIndex={0}
          aria-label="Ask question button"
          onClick={sendQuestion}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ' ? sendQuestion() : null)}>
          {sendQuestionDisabled ? (
            <SendRegular className={styles.questionInputSendButtonDisabled} />
          ) : (
            <img src={Send} className={styles.questionInputSendButton} alt="Send Button" />
          )}
        </div>
        <div className={styles.questionInputBottomBorder} />
      </Stack>
    </>
  )
}
