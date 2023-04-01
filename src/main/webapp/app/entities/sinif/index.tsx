import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Sinif from './sinif';
import SinifDetail from './sinif-detail';
import SinifUpdate from './sinif-update';
import SinifDeleteDialog from './sinif-delete-dialog';

const SinifRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Sinif />} />
    <Route path="new" element={<SinifUpdate />} />
    <Route path=":id">
      <Route index element={<SinifDetail />} />
      <Route path="edit" element={<SinifUpdate />} />
      <Route path="delete" element={<SinifDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SinifRoutes;
