import React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  List,
  number,
  NumberInput,
  required,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  ShowButton,
} from "react-admin";

export const DiseaseList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <ShowButton basePath="/disease" />
        <DeleteButton basePath="/disease" />
        <EditButton basePath="/disease" />
      </Datagrid>
    </List>
  );
};

export const DiseaseCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="/disease">
        <TextInput source="name" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};

export const DiseaseShow = (props) => {
  return (
    <Show {...props} title="DiseaseShow">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
      </SimpleShowLayout>
    </Show>
  );
};

export const DiseaseEdit = (props) => {
  return (
    <Edit title="Disease Edit" {...props}>
      <SimpleForm redirect="/disease">
        <TextInput source="name" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
