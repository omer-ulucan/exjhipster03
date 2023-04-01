import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Ogretmen from './ogretmen';
import OgretmenDetail from './ogretmen-detail';
import OgretmenUpdate from './ogretmen-update';
import OgretmenDeleteDialog from './ogretmen-delete-dialog';

const OgretmenRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Ogretmen />} />
    <Route path="new" element={<OgretmenUpdate />} />
    <Route path=":id">
      <Route index element={<OgretmenDetail />} />
      <Route path="edit" element={<OgretmenUpdate />} />
      <Route path="delete" element={<OgretmenDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OgretmenRoutes;
