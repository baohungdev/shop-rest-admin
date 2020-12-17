const treeify = (list, idAttr, parentAttr, childrenAttr) => {
  if (!idAttr) idAttr = 'id';
  if (!parentAttr) parentAttr = 'parentId';
  if (!childrenAttr) childrenAttr = 'children';

  var treeList = [];
  var lookup = {};
  list.forEach(function(obj) {
    lookup[obj[idAttr]] = obj;
    obj[childrenAttr] = [];
  });
  list.forEach(function(obj) {
    if (obj[parentAttr] != null) {
      if (lookup[obj[parentAttr]] !== undefined) {
        lookup[obj[parentAttr]][childrenAttr].push(obj);
      } else {
        //console.log('Missing Parent Data: ' + obj[parentAttr]);
        treeList.push(obj);
      }
    } else {
      treeList.push(obj);
    }
  });
  return treeList;
};

export default items => treeify(items);
