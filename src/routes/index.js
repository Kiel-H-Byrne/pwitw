import React from "react";

//Routes
import { Route, Switch } from "react-router";

//Code Splitting
// import { asyncComponent } from "../hocs/asyncComponent";

//Components
import AppMap from "../components/pages/Landing";
import ReadMePage from "../components/pages/Readme";

//Auth
export const LANDING = "/";
export const README = "/readme";
export const SINGLE_DEVICE = "/devices/:hostname";
export const TECH_STACK = "/tech-stack";

//Routes Object
const routes = (
  <div>
    <Switch>
      <Route exact path={LANDING} component={AppMap} />
      <Route name="ReadMePage" path={README} component={ReadMePage} />
      <Route name="SingleDevice" path={SINGLE_DEVICE} component={null} />
      <Route name="TechStack" path={TECH_STACK} component={null} />
    </Switch>
  </div>
);

export default routes;
