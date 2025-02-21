import { Outlet, Routes as ReactRouter, Route } from "react-router-dom";
import { lazy } from "react";

import { Loadable } from "./components/atoms/Loadable";
import { Loading } from "./components/atoms/Loading";
import ApplicantLayout from "./components/templates/app-layout/appLayout";
import { ROUTES } from "./constants";

const HomePage = Loadable(
    lazy(() =>
      import("./pages/homePage").catch(() => {
        return {
          default: () => <Loading />
        };
      })
    )
  );
// @ts-ignore
const ErrorPage = Loadable(lazy(() => import('./pages/errorPage')));

  function Router() {
    return (
        <ReactRouter>
          <Route
            path={ROUTES.HOME_PAGE}
            element={
              <ApplicantLayout>
                <Outlet />
              </ApplicantLayout>
            }
          >
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
          </Route>
          <Route path={'*'} element={<ErrorPage />} />
        </ReactRouter>
    );
  }
  
  export default Router;