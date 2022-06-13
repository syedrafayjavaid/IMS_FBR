import React from 'react'
import { Redirect } from 'react-router-dom'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import productsRoutes from './views/Products/ProductsRoutes'
import categoriesRoutes from './views/Categories/categoriesRoutes'
import productTypeRoute from './views/product-type/PrductTypeRoutes'
import qrcodeRoutes from './views/QRcode/qrCodeRoutes'
import mapRuotes from './views/map/mapRoutes'

<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...categoriesRoutes,
    ...productTypeRoute,
    ...productsRoutes,
    ...mapRuotes,
    ...qrcodeRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
    
]

export default routes
