import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  name,
  actions as newProductDetailActions
} from 'src/views/product/NewProductDetailView/redux';

const CreateCategoryDialog = ({
  actions,
  parentData,
  open,
  onClose,
  onClick
}) => {
  const [categoryName, setCategoryName] = React.useState('');

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Tạo loại sản phẩm mới</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền thông tin loại sản phẩm vào form bên dưới
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Loại sản phẩm cha"
          type="email"
          disabled={true}
          variant="outlined"
          value={parentData.name}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tên"
          variant="outlined"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          onClick={() => {
            onClick({
              parentId: parentData.id,
              name: categoryName,
              tier: parentData.tier + 1
            });
            setCategoryName('');
          }}
          color="primary"
        >
          Tạo loại sản phẩm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...newProductDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCategoryDialog);
