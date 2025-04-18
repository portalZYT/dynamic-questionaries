import {
    ArrayCards,
    ArrayTable,
    Cascader,
    Checkbox,
    DatePicker,
    Editable,
    Form,
    FormCollapse,
    FormGrid,
    FormItem,
    FormLayout,
    FormTab,
    Input,
    NumberPicker,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Space,
    Submit,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
  } from '@formily/antd-v5';
  import { createForm } from '@formily/core';
  import { createSchemaField } from '@formily/react';
  import { TreeNode } from '@portalxsk/designable-core';
  import { transformToSchema } from '@portalxsk/designable-formily-transformer';
  import { Card, Rate, Slider } from 'antd';
  import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
  const Text: React.FC<{
    value?: string;
    content?: string;
    mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
  }> = ({ value, mode, content, ...props }) => {
    const tagName = mode === 'normal' || !mode ? 'div' : mode;
    return React.createElement(tagName, props, value || content);
  };
  
  const SchemaField = createSchemaField({
    components: {
      Space,
      FormGrid,
      FormLayout,
      FormTab,
      FormCollapse,
      ArrayTable,
      ArrayCards,
      FormItem,
      DatePicker,
      Checkbox,
      Cascader,
      Editable,
      Input,
      Text,
      NumberPicker,
      Switch,
      Password,
      PreviewText,
      Radio,
      Reset,
      Select,
      Submit,
      TimePicker,
      Transfer,
      TreeSelect,
      Upload,
      Card,
      Slider,
      Rate,
    },
  });
  
  export interface IPreviewWidgetProps {
    tree: TreeNode;
    components?: any;
  }
  
  export const PreviewWidget2: React.FC<IPreviewWidgetProps> = (props) => {
    const form = useMemo(() => createForm(), []);
    const { form: formProps, schema } = transformToSchema(props.tree);
    return (
      <Form {...formProps} form={form}>
        <SchemaField schema={schema} />
      </Form>
    );
  };
  
  export const PreviewWidget = forwardRef(function PreviewWidget(
    props: any,
    ref,
  ) {
    useImperativeHandle(
      ref,
      () => {
        return {
          getTree() {
            return props.tree;
          },
          getForm() {
            return form;
          },
          getFormValues: async () => {
            const s = await form.submit();
            console.log('1232323232', s);
            return s;
          },
          getSchema() {
            return schema;
          },
        };
      },
      [],
    );
  
    const form = useMemo(() => createForm(), []);
    const { form: formProps, schema } = transformToSchema(props.tree);
    return (
      <Form {...formProps} form={form}>
        <SchemaField schema={schema} />
      </Form>
    );
  });
  