import { Routes } from "@angular/router";
import { SignupPageComponent, SigninPageComponent } from "./pages";

const authRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signup",
        title: "Signup",
        component: SignupPageComponent
      },
      {
        path: "signin",
        title: "Signin",
        component: SigninPageComponent
      },
      {
        path: "**",
        redirectTo: "signup"
      }
    ]
  }
]

export default authRoutes;
