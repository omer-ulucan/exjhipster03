import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/ogrenci">
        <Translate contentKey="global.menu.entities.ogrenci" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/sinif">
        <Translate contentKey="global.menu.entities.sinif" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ogretmen">
        <Translate contentKey="global.menu.entities.ogretmen" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
