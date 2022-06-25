import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const EmployeesList = Loadable(lazy(() => import("./EmployeesList")));
const EmployeeDetail = Loadable(lazy(() => import("./EmployeeDetail")));


const employeesRoutes = [
    {
        path: '/employee/list',
        element: <EmployeesList/>,
    },
    {
        path: '/employee/details',
        element: <EmployeeDetail />,
    },
]

export default employeesRoutes;