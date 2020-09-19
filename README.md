# 介绍

react的组织树组件


## 使用方式

```js
import { OrgTree } from 'r-org-tree' 

const data = {
  id: 0,
  label: '一级',
  children: [
    {
      id: 1,
      label: <div>二级内容1</div>,
      conditionList: '条件项',
      children: [
        {
          id: 4,
          label: '三级内容1',
          conditionList: '年后111',
        },
        {
          id: 5,
          label: '三级内容2'
        }
      ]
    },
    {
      id: 2,
      label: <div>二级内容1</div>,
      children: [{ id: 44, label: 'demo' }]
    }
  ]
}

<OrgTree
  data={data}
  // labelClassName
  activeId={value}
  horizontal={horizontal}
  collapsable={collapsable}
  expandAll={expandAll}
  onClick={handleClick}
 />
```

