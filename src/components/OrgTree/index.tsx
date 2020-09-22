import React, { useEffect, useMemo } from 'react';
import classnames from 'classnames';
import TreeNode from './treeNode';
import { useForceUpdate } from '../../hooks'
import './org_tree.less';

//组件
const defaultNode = {
    id: 'id',
    label: 'label',
    expand: 'expand',
    children: 'children'
}

export interface NodeProps {
    id?: string,
    label?: string,
    expand?: string,
    children?: string
}
export interface DataProps {
    id?: string | number
    label?: React.ReactNode
    conditionList?: React.ReactNode
    children?: DataProps[]
    [props: string]: any
}

export interface OrgTreeProps {
    data: DataProps
    labelWidth?: string | number
    horizontal?: boolean
    collapsable?: boolean
    expandAll?: boolean
    activeId: string | number
    node?: NodeProps
    labelClassName?: string
    conditionClassName?: string
    onClick?: (e: React.MouseEventHandler<HTMLElement>, data: any) => void
    renderContent?: (data: any) => void
}

const OrgTree: React.FC<OrgTreeProps> = (props) => {
    const forceUpdate = useForceUpdate()
    const {
        horizontal,
        expandAll,
        activeId,
        node,
        data,
        onClick,
        renderContent = data => data.label,
        ...restProps
    } = useMemo(() => props, [props])

    useEffect(() => {
        if (expandAll) toggleExpand(data, true);
    }, [])

    const handleExpand = (_e, nodeData) => {
        if ('expand' in nodeData) {
            nodeData.expand = !nodeData.expand;
            if (!nodeData.expand && nodeData.children) {
                collapse(nodeData.children);
            }
            forceUpdate()
        } else {
            nodeData.expand = true;
            forceUpdate()
        }
    }

    const collapse = (list) => {
        list.forEach((child) => {
            if (child.expand) {
                child.expand = false;
            }
            child.children && collapse(child.children);
        });
    }

    const toggleExpand = (data, val) => {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                item.expand = val;
                if (item.children) {
                    toggleExpand(item.children, val);
                }
            });
        } else {
            data.expand = val;
            if (data.children) {
                toggleExpand(data.children, val);
            }
        }
        forceUpdate()
    }

    return (
        <div className="org-tree-container">
            <div className={classnames('org-tree', { 'horizontal': horizontal })}>
                <TreeNode
                    data={data}
                    activeId={activeId}
                    node={{ ...defaultNode, ...node }}
                    onExpand={(e, nodeData) => handleExpand(e, nodeData)}
                    onClick={(e, nodeData) => onClick && onClick(e, nodeData)}
                    renderContent={renderContent}
                    {...restProps}
                />
            </div>
        </div>
    )
}

export default OrgTree;
