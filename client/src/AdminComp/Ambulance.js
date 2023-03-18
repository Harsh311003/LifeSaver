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

export const AmbulanceList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="plateNo" label="Plate No" />
        <ShowButton basePath="/ambulance" />
        <DeleteButton basePath="/ambulance" />
        <EditButton basePath="/ambulance" />
      </Datagrid>
    </List>
  );
};

export const AmbulanceCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="/ambulance">
        <TextInput
          source="plateNo"
          label="Plate Number"
          validate={[required()]}
        />
        <TextInput
          source="regNo"
          label="Registeration Number"
          validate={[required()]}
        />
        <TextInput
          source="chassisNo"
          label="Chassis Number"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export const AmbulanceShow = (props) => {
  return (
    <Show {...props} title="AmbulanceShow">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="plateNo" label="Plate Number" />
        <TextField source="regNo" label="Registeration Number" />
        <TextField source="chassisNo" label="Chassis Number" />
      </SimpleShowLayout>
    </Show>
  );
};

export const AmbulanceEdit = (props) => {
  return (
    <Edit title="Ambulance Edit" {...props}>
      <SimpleForm redirect="/ambulance">
        <TextInput
          source="plateNo"
          label="Plate Number"
          validate={[required()]}
        />
        <TextInput
          source="regNo"
          label="Registeration Number"
          validate={[required()]}
        />
        <TextInput
          source="chassisNo"
          label="Chassis Number"
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
