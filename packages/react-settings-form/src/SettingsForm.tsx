import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { observer } from '@formily/react';
import { requestIdle, cancelIdle } from '@portalxsk/designable-shared';
import {
  usePrefix,
  useSelected,
  useOperation,
  useSelectedNode,
  useWorkbench,
  IconWidget,
  NodePathWidget,
  useCssInJs,
} from '@portalxsk/designable-react';
import { SchemaField } from './SchemaField';
import { ISettingFormProps } from './types';
import { SettingsFormContext } from './shared/context';
import { effectLocales, effectSnapshot } from './effects';
import { Empty } from 'antd';
import cls from 'classnames';

import { genSettingsFormStyle } from './styles';
// import './styles.less'

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm: React.FC<ISettingFormProps> = observer(
  (props) => {
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const operation = useOperation(currentWorkspaceId);
    const node = useSelectedNode(currentWorkspaceId);
    const selected = useSelected(currentWorkspaceId);
    const prefix = usePrefix('settings-form');
    const schema = node?.designerProps?.propsSchema;
    const isEmpty = !(
      node &&
      node.designerProps?.propsSchema &&
      selected.length === 1
    );
    const form = useMemo(() => {
      return createForm({
        initialValues: node?.designerProps?.defaultProps,
        values: node?.props,
        effects(form) {
          effectLocales(node);
          effectSnapshot(operation);
          props.effects?.(form);
        },
      });
    }, [node, node?.props, schema, operation, isEmpty]);

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cls(prefix, props.className, hashId)}
            style={props.style}
            key={node.id}
          >
            <SettingsFormContext.Provider value={props}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={schema}
                  components={props.components}
                  scope={{ $node: node, ...props.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        );
      }
      return (
        <div className={prefix + '-empty'}>
          <Empty />
        </div>
      );
    };

    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genSettingsFormStyle,
    });

    return wrapSSR(
      <IconWidget.Provider tooltip>
        <div className={cls(prefix + '-wrapper', hashId)}>
          {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
          <div className={cls(prefix + '-content', hashId)}>{render()}</div>
        </div>
      </IconWidget.Provider>,
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  },
);
