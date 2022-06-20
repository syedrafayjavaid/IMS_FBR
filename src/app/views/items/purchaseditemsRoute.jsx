import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const PurchasedItems = Loadable(lazy(() => import("./PurchasedItems")));


const purchaseditemsRoute = [
    {
        path: 'items/PurchasedItems',
        element: <PurchasedItems/>,
    },
    {
        path: 'items/PurchasedItemsDetail',
        element: <PurchasedItems/>,
    },
]

export default purchaseditemsRoute;
