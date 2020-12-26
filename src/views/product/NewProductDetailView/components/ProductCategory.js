import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography,
  colors
} from '@material-ui/core';

import _map from 'lodash/map';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import Link from '@material-ui/core/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import CreateCategoryDialog from './CreateCategoryDialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as newProductDetailActions
} from 'src/views/product/NewProductDetailView/redux';

import buildHierachy from 'src/utils/buildHierachy';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

const buildTreeDom = (
  tree,
  parentTier,
  setterOpenCategory,
  setterParentData,
  openWithParentData
) => {
  const createNewCategoryEl = () => (
    <Link
      style={{ color: colors.green[700] }}
      component="button"
      onClick={() => {
        setterOpenCategory(true);
        setterParentData(openWithParentData);
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <AddIcon color="inherit" />
        <Typography variant="body2">Thêm loại sản phẩm</Typography>
      </div>
    </Link>
  );
  if (_isEmpty(tree) && parentTier !== 3) {
    return createNewCategoryEl();
  }

  return _map(tree, (item, index) => {
    return (
      <React.Fragment>
        <TreeItem nodeId={`${item.id}`} key={item.id} label={item.name}>
          {buildTreeDom(
            item.children,
            item.tier,
            setterOpenCategory,
            setterParentData,
            { id: item.id, name: item.name, tier: item.tier }
          )}
        </TreeItem>
        {index === tree.length - 1 && createNewCategoryEl()}
      </React.Fragment>
    );
  });
};

const getPathToSelectedId = (id, data) => {
  const result = [];
  while (true) {
    const item = _find(data, d => d.id === id);
    if (!item) break;
    if (!item.parentId) break;
    result.unshift(item.parentId);
    id = item.parentId;
  }
  return result;
};

const ControlledTreeView = ({
  actions,
  data,
  product,
  setterOpenCategory,
  setterParentData
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(
    getPathToSelectedId(product.categoryId, data) || []
  );

  const selected = product.categoryId;

  const tree = buildHierachy(JSON.parse(JSON.stringify(data)));

  let _expanded = expanded;

  React.useEffect(() => {
    _expanded = getPathToSelectedId(product.categoryId, data) || [];
  }, []);

  const handleToggle = (event, nodeIds) => {
    setExpanded(prevousNodeIds => nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    actions.selectCategory(nodeIds);
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={_expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {buildTreeDom(tree, 1, setterOpenCategory, setterParentData, {
        id: 0,
        name: 'Không có cha của loại sản phẩm',
        tier: 0
      })}
    </TreeView>
  );
};

const ProductCategory = ({
  add: product,
  actions,
  isFetchingCategories,
  categories
}) => {
  useEffect(() => {
    actions.fetchCategories();
  }, []);

  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(
    false
  );
  const [parentCategory, setParentCategory] = useState({
    id: 0,
    name: '',
    tier: 0
  });

  const handleCreateCategory = newCategory => {
    setOpenCreateCategoryDialog(false);
    actions.createCategory(newCategory);
  };

  return (
    <Card>
      <CreateCategoryDialog
        open={openCreateCategoryDialog}
        parentData={parentCategory}
        onClose={() => setOpenCreateCategoryDialog(false)}
        onClick={handleCreateCategory}
      />
      <CardHeader title="Phân loại" />
      <Divider />
      <CardContent style={{ overflowY: 'auto' }}>
        {isFetchingCategories ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
          </React.Fragment>
        ) : (
          <ControlledTreeView
            data={categories}
            product={product}
            actions={actions}
            setterOpenCategory={setOpenCreateCategoryDialog}
            setterParentData={setParentCategory}
          />
        )}
      </CardContent>
      <Box mt={3} />
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...newProductDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
