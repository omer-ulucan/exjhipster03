import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Ogrenci from './ogrenci';
import Sinif from './sinif';
import Ogretmen from './ogretmen';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="ogrenci/*" element={<Ogrenci />} />
        <Route path="sinif/*" element={<Sinif />} />
        <Route path="ogretmen/*" element={<Ogretmen />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
