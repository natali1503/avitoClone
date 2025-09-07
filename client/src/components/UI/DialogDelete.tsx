import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { CustomButton } from './CustomButton';

interface IDialogDelete {
  textButton: string;
  dialogTitle?: string;
  dialogContent?: string;
  handleClickDelete: () => Promise<void>;
}

export const DialogDelete: React.FC<IDialogDelete> = ({
  textButton,
  dialogTitle,
  dialogContent,
  handleClickDelete,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CustomButton text={textButton} onClick={handleClickOpen} color='warning' sx={{ minWidth: '100%' }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-evenly' }}>
          <CustomButton text={'Отменить'} onClick={handleClose} sx={{ minWidth: '100%' }} />
          <CustomButton
            text={'Удалить'}
            onClick={() => {
              handleClickDelete();
              handleClose();
            }}
            autoFocus
            color='warning'
            sx={{ minWidth: '100%' }}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
