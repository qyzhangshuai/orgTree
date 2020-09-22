# 介绍

react的组织树组件


## 使用方式

```js
import React, { useState } from 'react'
import { OrgTree } from 'r-org-tree'
import { DataProps } from 'r-org-tree/es/components/OrgTree'

const horizontal = false; // true：横向  false：纵向
const collapsable = true; // true：可折叠 false：不可折叠 
const expandAll = true; // true: 全部展开 false：全部折叠 

interface DemoProps {
	// 自己添加
}

const Demo: React.FC<DemoProps> = ({

}) => {
	const [value, setValue] = useState()

	const data: DataProps = {
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

	const handleClick = (_e, data) => {
		console.log('data', data)
	}

	return (
		<OrgTree
			data={data}
			activeId={value}
			horizontal={horizontal}
			collapsable={collapsable}
			expandAll={expandAll}
			onClick={handleClick}
		/>
	)
}

```



# 属性

| 参数               | 说明                                                         | 类型                                                         | 默认值                                                       | 是否必填 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- |
| data               | 数据源                                                       | json                                                         | -                                                            | 是       |
| labelWidth         | label项宽度                                                  | string \| number                                             | -                                                            | 否       |
| horizontal         | 是否水平                                                     | boolean                                                      | false                                                        | 否       |
| collapsable        | 是否可折叠                                                   | boolean                                                      | false                                                        | 否       |
| expandAll          | 是否全部展开                                                 | boolean                                                      | false                                                        | 否       |
| activeId           | 选中的id                                                     | string \| number                                             | -                                                            | 否       |
| node               | data中的 id label expand      children的字段，可以将数据源的字段进行替换 | object                                                       | {id: 'id',label: 'label',expand: 'expand',children: 'children'} | 否       |
| labelClassName     | label自定义类名                                              | string                                                       | -                                                            | 否       |
| conditionClassName | conditionList自定义类名                                      | string                                                       | -                                                            | 否       |
| onClick            | 点击label函数                                                | (e: React.MouseEventHandler<HTMLElement>, data: any) => void | -                                                            | 否       |
| onConditionClick   | 点击conditionList时触发函数                                  | (e: React.MouseEventHandler<HTMLElement>, data: any) => void | -                                                            |          |
| renderContent      | 处理label的数据，渲染label函数                               | (data: any) => void                                          | -                                                            | 否       |

