import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const DashBoard = Loadable(lazy(() => import('./DashBoard')))
const AdminBoard = Loadable(lazy(() => import('./AdminBoard')))

const dashboardRoutes = [
    {
        path: '/dashboard',
        element: <DashBoard />,
        auth: authRoles.all,
    },
]

export default dashboardRoutes
