import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Ogrenci from './ogrenci';
import OgrenciDetail from './ogrenci-detail';
import OgrenciUpdate from './ogrenci-update';
import OgrenciDeleteDialog from './ogrenci-delete-dialog';

const OgrenciRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Ogrenci />} />
    <Route path="new" element={<OgrenciUpdate />} />
    <Route path=":id">
      <Route index element={<OgrenciDetail />} />
      <Route path="edit" element={<OgrenciUpdate />} />
      <Route path="delete" element={<OgrenciDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OgrenciRoutes;
