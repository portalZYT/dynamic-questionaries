import React from 'react';
import { clone, toArr } from '@formily/shared';
import { observer } from '@formily/reactive-react';
import {
  IconWidget,
  TextWidget,
  usePrefix,
  useToken,
} from '@portalxsk/designable-react';
import { INodeItem, ITreeDataSource } from './types';
import { traverseTree } from './shared';
import cls from 'classnames';
// import './styles.less'
export interface ITitleProps extends INodeItem {
  treeDataSource: ITreeDataSource;
}

export const Title: React.FC<ITitleProps> = observer((props) => {
  const prefix = usePrefix('data-source-setter-node-title');
  const { hashId } = useToken();
  const getTitleValue = (dataSource) => {
    const optionalKeys = ['label', 'title', 'header'];
    let nodeTitle: string;
    optionalKeys.some((key) => {
      const title = toArr(dataSource).find((item) => item.label === key)?.value;
      if (title !== undefined) {
        nodeTitle = title;
        return true;
      }
      return false;
    });
    if (nodeTitle === undefined) {
      toArr(dataSource || []).some((item) => {
        if (item.value && typeof item.value === 'string') {
          nodeTitle = item.value;
          return true;
        }
        return false;
      });
    }
    return nodeTitle;
  };

  const renderTitle = (dataSource) => {
    const nodeTitle = getTitleValue(dataSource);
    if (nodeTitle === undefined)
      return (
        <TextWidget token="SettingComponents.DataSourceSetter.defaultTitle" />
      );
    else return nodeTitle + '';
  };

  return (
    <div className={cls(prefix, hashId)}>
      <span style={{ marginRight: '5px' }}>
        {renderTitle(props?.map || [])}
      </span>
      <IconWidget
        className={cls(prefix + '-icon', hashId)}
        infer="Remove"
        onClick={() => {
          const newDataSource = clone(props?.treeDataSource?.dataSource);
          traverseTree(newDataSource || [], (dataItem, i, data) => {
            if (data[i].key === props.duplicateKey) toArr(data).splice(i, 1);
          });
          props.treeDataSource.dataSource = newDataSource;
        }}
      />
    </div>
  );
});
