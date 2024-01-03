"use client";
import DashboardLayout from "@components/dashboard/layout";
import React from "react";
import {Selectable} from "@framework/model";
import KeyValueList from "@framework/components/key.value.list";

const CHOICES: Selectable[] = [
  {id: "1", name: "Choice 1"},
  {id: "2", name: "Choice 2"},
  {id: "3", name: "Choice 3"},
  {id: "4", name: "Choice 4"},
];

const original = {
  "hello": "world",
  "foo": "bar",
  "baz": "qux"
};

export const RealDashboardPage = (props: any) => {
  // const load = () => {
  //   fetch(`http://localhost:3000/api/locations?text=Wander`)
  //     .then((result) => {
  //       console.log("returned", result);
  //       return result.text();
  //       // setLocations(result);
  //     })
  //     .then((text) => {
  //       console.log("text", text);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  const onChange = (payload: Record<string, string>, errors: Record<string, boolean>) => {
    console.log("payload", payload);
    console.log("errors", errors);
  };

  return (
    <DashboardLayout>
      <KeyValueList payload={original} onChanged={onChange} maxLen={20}></KeyValueList>
    </DashboardLayout>
  );
};

export default RealDashboardPage;
