import React from "react";
import { Admin, Resource } from "react-admin";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import {
  AmbulanceCreate,
  AmbulanceEdit,
  AmbulanceList,
  AmbulanceShow,
} from "./Ambulance";

export default function AdminComp() {
  return (
    <div>
      <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource
          name="ambulance"
          list={AmbulanceList}
          create={AmbulanceCreate}
          show={AmbulanceShow}
          edit={AmbulanceEdit}
        />
      </Admin>
    </div>
  );
}
