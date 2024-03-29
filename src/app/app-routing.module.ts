import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AuthorComponent } from "./admin/author/author.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "lms/home",
        pathMatch: "full",
      },
      {
        path: "lms/home",
        component: HomeComponent,
      },
      {
        path: "lms/admin",
        component: AdminComponent,
      },
      {
        path: "lms/admin/author",
        component: AuthorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
