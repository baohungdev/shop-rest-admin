import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';

import _map from 'lodash/map';
import _find from 'lodash/find';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import buildHierachy from 'src/utils/buildHierachy';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

const buildTreeDom = tree => {
  return _map(tree, item => {
    return (
      <TreeItem nodeId={`${item.id}`} key={item.id} label={item.name}>
        {buildTreeDom(item.children)}
      </TreeItem>
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

const ControlledTreeView = ({ actions, data, product }) => {
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
      {buildTreeDom(tree)}
    </TreeView>
  );
};

const ProductCategory = ({ product, actions, categories }) => {
  useEffect(() => {
    actions.fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader title="Phân loại" />
      <Divider />
      <CardContent>
        <ControlledTreeView
          data={categories}
          product={product}
          actions={actions}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCategory;
