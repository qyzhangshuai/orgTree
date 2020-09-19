import React from 'react';

// 判断是否叶子节点
const isLeaf = (data, prop) => {
    const node = prop.node;
    return !(Array.isArray(data[node.children]) && data[node.children].length > 0);
};

// 创建 node 节点
export const renderNode = (data, prop) => {
    const node = prop.node;
    const cls = ['org-tree-node'];

    if (isLeaf(data, prop)) {
        cls.push('is-leaf');
    } else if (prop.collapsable && !data[node.expand]) {
        cls.push('collapsed');
    }

    return (
        <div
            key={data[node.id]}
            className={cls.join(' ')}
        >
            {renderLabel(data, prop)}
            {
                (!prop.collapsable || data[node.expand]) ? renderChildren(data.children, prop) : null
            }
        </div>
    )
};

// 创建展开折叠按钮
export const renderBtn = (data, prop) => {
    const { onExpand } = prop;
    const node = prop.node;

    let cls = ['org-tree-node-btn'];

    if (data[node.expand]) {
        cls.push('expanded');
    }

    return <span
        key={data[node.id]}
        className={cls.join(' ')}
        onClick={(e) => {
            e.stopPropagation();
            typeof onExpand === 'function' && onExpand(e, data);
        }}
    />
};

// 创建 label 节点
export const renderLabel = (data, prop) => {
    const node = prop.node;
    const label = data[node.label];
    const renderContent = prop.renderContent;
    const onClick = prop.onClick;

    const childNodes = [];
    if (typeof renderContent === 'function') {
        let vnode = renderContent(data);
        vnode && childNodes.push(vnode);
    } else {
        childNodes.push(label);
    }

    if (prop.collapsable && !isLeaf(data, prop)) {
        childNodes.push(renderBtn(data, prop));
    }

    const cls = ['org-tree-node-label-inner'];

    let { labelWidth, labelClassName } = prop;

    labelClassName && cls.push(labelClassName);
    return (
        <div
            key={`label_${data[node.id]}`}
            className={'org-tree-node-label'}
        >
            {
                data.conditionList ? (
                    <div
                        key={`label_inner_condition_${data[node.id]}`}
                        className={cls.join(' ').concat(' org-tree-node-condition')}
                    >{data.conditionList}</div>) : null
            }
            <div
                key={`label_inner_${data[node.id]}`}
                className={cls.join(' ').concat(' org-tree-node-cursor').concat(prop.activeId === data[node.id] ? ' org-tree-node-active' : '')}
                style={{ width: labelWidth ? parseInt(labelWidth) + 'px' : 'auto' }}
                onClick={(e) => typeof onClick === 'function' && onClick(e, data)}
            >
                {childNodes.map((item, index) => <div key={index}>{item}</div>)}
            </div>
        </div>
    )
};

// 创建 node 子节点
export const renderChildren = (list, prop) => {
    if (Array.isArray(list) && list.length) {
        const children = list.map(item => {
            return renderNode(item, prop);
        });

        return (
            <div
                key={`children_${children[0].key}`}
                className={'org-tree-node-children'}
            >
                {children}
            </div>
        )
    }
    return '';
};

export const render = (props) => {
    return renderNode(props.data, props);
};

export default render;
