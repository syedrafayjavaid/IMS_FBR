import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const CategoriesList = Loadable(lazy(() => import("./CategoriesList")));


const categoriesRoutes = [
    {
        path: '/categories/list',
        element: <CategoriesList/>,
    },
]

export default categoriesRoutes;
