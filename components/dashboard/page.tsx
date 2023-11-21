"use client";
import DashboardLayout from "@components/dashboard/layout";
import React from "react";
import {Selectable} from "@framework/model";

const CHOICES: Selectable[] = [
  {id: "1", name: "Choice 1"},
  {id: "2", name: "Choice 2"},
  {id: "3", name: "Choice 3"},
  {id: "4", name: "Choice 4"},
];

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

  return (
    <DashboardLayout>
      {/*<div>coming soon</div>*/}
      {/*<button className="__button __primary" onClick={load}>*/}
      {/*  load*/}
      {/*</button>*/}
    </DashboardLayout>
  );
};

export default RealDashboardPage;
