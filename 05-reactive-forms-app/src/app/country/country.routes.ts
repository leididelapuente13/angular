import { Routes } from "@angular/router";
import { CountryPageComponent } from "./pages/country-page/country-page.component";

const countryRoutes: Routes = [
  {
    path: "",
    title: "Country",
    component: CountryPageComponent
  }
]

export default countryRoutes;
