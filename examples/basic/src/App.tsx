import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from '@portalxsk/designable-core';
import { useEffect, useMemo, useRef } from 'react';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  IDesignerComponents,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@portalxsk/designable-react';
import {
  ArrayCards,
  ArrayTable,
  Field,
  Form,
  Input,
  NumberPicker,
  Password,
  Rate,
  Card,
  FormGrid,
  Space,
  Select,
  Checkbox,
  Radio,
} from '@portalxsk/designable-formily-antd';
import { SettingsForm } from '@portalxsk/designable-react-settings-form';
import { transformToSchema } from '@portalxsk/designable-formily-transformer';
import { Button } from 'antd';
import { PreviewWidget } from './PreviewWidget';

function App() {
  const previewWidgetRef = useRef<any>(null);
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handler(_ctx: any) {
              console.log(
                JSON.stringify(transformToSchema(engine.getCurrentTree())),
              );
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  const handleSave = () => {
    console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
  };

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('zh-cn');
  }, []);

  const components: IDesignerComponents = {
    Form,
    Field,
    Input,
    Rate,
    NumberPicker,
    Password,
    ArrayCards,
    ArrayTable,
    Card,
    FormGrid,
    Space,
    Select,
    Checkbox,
    Radio,
  };

  return (
    <Designer engine={engine}>
      <StudioPanel
        actions={[
          <Button onClick={handleSave}>保存</Button>,
          <Button
            onClick={() => {
              console.log('1', engine);
              console.log('3', previewWidgetRef?.current?.getForm());
              console.log(
                'getFormValues',
                previewWidgetRef?.current?.getFormValues?.(),
              );
            }}
          >
            debug
          </Button>,
        ]}
      >
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="基础组件"
              sources={[
                Input,
                Select,
                Password,
                NumberPicker,
                Rate,
                Checkbox,
                Radio,
              ]}
            />
            <ResourceWidget
              title="布局组件"
              sources={[Card, FormGrid, Space]}
            />
            {/* <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            /> */}
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          {/* <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item> */}
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => <ComponentTreeWidget components={components} />}
              </ViewPanel>
              <ViewPanel type={`PREVIEW`}>
                {(tree) => (
                  <PreviewWidget
                    tree={tree}
                    components={components}
                    ref={previewWidgetRef}
                  />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm
            components={{
              DictionarySelector: (props: any) => {
                return (
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    labelInValue
                    onSelect={(value: any, option: any) => {
                      console.log('选择字典项----', value, option);
                    }}
                    onChange={() => {}}
                    onSearch={() => {}}
                    options={[
                      {
                        value: 'jack',
                        label: 'Jack',
                      },
                      {
                        value: 'lucy',
                        label: 'Lucy',
                      },
                      {
                        value: 'tom',
                        label: 'Tom',
                      },
                    ]}
                  />
                );
              },
            }}
          />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
}

export default App;
