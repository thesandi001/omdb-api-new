import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MoviesHomeComponent } from "./movies-home/movies-home/movies-home.component";

// App Routing Module
export const appRoutes: Routes = [
  { path: "", redirectTo: "movies", pathMatch: "full" },
  { path: "**", redirectTo: "movies" },
  { path: "movies", component: MoviesHomeComponent }
];

export const appRoute = RouterModule.forRoot(appRoutes);
