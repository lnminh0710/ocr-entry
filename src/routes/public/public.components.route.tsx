import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const AddPerson = lazy(() =>
    import("../../pages/private/add-person/add-person.container")
);
const routes: RouteProps[] = [
    {
        exact: true,
        path: "/",
        component: AddPerson
    }
];

export default routes;
