import { Routes } from "@angular/router";
import { BasicPageComponent } from "./pages/basic-page/basic-page.component";
import { DynamicPageComponent } from "./pages/dynamic-page/dynamic-page.component";
import { SwitchesPageComponent } from "./pages/switches-page/switches-page.component";

const reactiveRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "basic",
        title: "Basic Forms",
        component: BasicPageComponent
      },
      {
        path: "dynamic",
        title: "Dynamic Forms",
        component: DynamicPageComponent
      },
      {
        path: "switches",
        title: "Switches",
        component: SwitchesPageComponent
      },
      {
        path: "**",
        redirectTo: "basic"
      }
    ]
  }
]

export default reactiveRoutes;
