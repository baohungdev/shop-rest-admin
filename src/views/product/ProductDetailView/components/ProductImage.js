import React, { useState } from 'react';

import {
  Card,
  CardContent,
  Box,
  makeStyles,
  colors,
  ButtonBase,
  CircularProgress,
} from '@material-ui/core';
import {
  Image as ImageIcon,
  AddAPhoto as AddAPhotoIcon
} from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    minHeight: 150
  },
  focusVisible: {},
  button: {
    backgroundColor: colors.blueGrey[100],
    width: '100%',
    height: '100%',
    '&:hover': {
      backgroundColor: colors.green[300],
      color: colors.common.white
    }
  },
  icon: {
    textAlign: 'center'
  }
}));

const ProductImage = ({ actions, isUploadingProductImages }) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const classes = useStyles();

  return (
    <Card style={{ height: '100%' }}>
      <CardContent style={{ height: '100%' }}>
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText={'Đóng'}
          submitButtonText={'Cập nhật'}
          maxFileSize={5000000}
          open={isOpenModal}
          onClose={() => setOpenModal(false)}
          onSave={files => {
            setOpenModal(false);
            actions.uploadImageBatch(files);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
          Icon={ImageIcon}
          dialogTitle={'Thêm ảnh sản phẩm'}
          dropzoneText={
            'Kéo và thả hình hoặc bấm vào ô bên dưới để chọn ảnh của bạn'
          }
          fullWidth={true}
          filesLimit={10}
        />

        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          style={{ height: '100%' }}
        >
          <div className={classes.root}>
            <ButtonBase
              focusRipple
              className={classes.button}
              disabled={isUploadingProductImages}
              focusVisibleClassName={classes.focusVisible}
              onClick={() => setOpenModal(true)}
            >
              <span className={classes.icon}>
              {isUploadingProductImages ?
              <CircularProgress/> :
                <AddAPhotoIcon />
              }
              </span>
            </ButtonBase>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductImage;
