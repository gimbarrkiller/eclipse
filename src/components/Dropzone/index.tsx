import React, {
  useCallback,
  useState,
  useEffect,
  FC,
  ReactNode,
} from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

import { Endpoint } from 'api';
import { avatarImage } from 'assets/images';
import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { sagaExceptionHandler } from 'utils';
import { FileObjectType } from 'types';
import { authSelectors } from 'store/auth/selectors';
import { profileSelectors } from 'store/profile/selectors';
import { ticketSelectors } from 'store/ticket/selectors';

import { WhiteContainer } from 'containers';
import { Image, Button, toastError } from 'components';

import styles from './styles.module.scss';

interface IDropzone {
  data?: FileObjectType | string;
  onChange?: (file: FileObjectType) => void,
  isTicket?: boolean,
  textInfo?: string,
  textBtn?: string | ReactNode,
  classNameContainer?: string,
}

const URL_API = process.env.REACT_APP_API_URL as string;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_TYPE_NO_ACCESS = ['html', 'HTML', 'js', 'JS'];

export const Dropzone: FC<IDropzone> = ({
  data,
  onChange,
  isTicket,
  textInfo,
  textBtn,
  classNameContainer,
}) => {
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const accessToken = useSelector(authSelectors.getProp('accessToken'));
  const isSavingAvatar = useSelector(profileSelectors.getProp('isSavingAvatar'));
  const createdTicketId = useSelector(ticketSelectors.getProp('createdTicketId'));
  const [files, setFiles] = useState<FileObjectType | undefined>();

  useEffect(() => {
    if (files && onChange) {
      onChange(files);
    }
  }, [files, onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileType = file.name.split('.').at(-1);
    if (fileType && FILE_TYPE_NO_ACCESS.includes(fileType)) {
      toastError('Unauthorized file type');
    } else if (file.size >= MAX_FILE_SIZE) {
      toastError('File size exceeds the limit of 5MB');
    } else {
      setFiles(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }) as FileObjectType);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = useCallback(async () => {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append(isTicket ? 'file' : 'avatar', files);
    if (createdTicketId) {
      formData.append('ticket_id', createdTicketId.toString());
    }
    try {
      await fetch(`${URL_API}${isTicket ? Endpoint.TicketsFiles : Endpoint.ProfileEditAvatar}`, {
        method: isTicket ? 'POST' : 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      sagaExceptionHandler(error);
    } finally {
      setFiles(undefined);
    }
  }, [
    files,
    accessToken,
    createdTicketId,
    isTicket,
    setFiles,
  ]);

  const removePreview = (file: FileObjectType) => {
    URL.revokeObjectURL(file.preview);
  };

  useEffect(() => {
    if (files && ((isTicket && createdTicketId) || isSavingAvatar)) {
      handleUpload().then((r) => r).catch((r) => r);
    }
  }, [
    isSavingAvatar,
    handleUpload,
    createdTicketId,
    isTicket,
    files,
  ]);

  useEffect(() => () => {
    if (files) {
      removePreview(files);
    }
  }, [files]);

  return (
    <div className={styles.dropzone_container}>
      <WhiteContainer
        className={cn(styles.dropzone_avatar, classNameContainer)}
      >
        <div
          className={styles.dropzone_avatar_img_text}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {!isTicket && (
            <Image
              url={files?.preview || data || avatarImage}
              className={styles.dropzone_avatar_img}
            />
          )}
          <div
            className={cn(styles.dropzone_text, { [styles.dropzone_text_ticket]: isTicket })}
          >
            {textInfo}
          </div>
        </div>
        <Button
          {...getRootProps()}
          isGrayBg={!isTicket}
          isFullWidth={isTablet}
          className={styles.dropzone_btn}
        >
          {textBtn}
        </Button>
      </WhiteContainer>
    </div>
  );
};
