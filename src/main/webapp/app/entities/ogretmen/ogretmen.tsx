import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOgretmen } from 'app/shared/model/ogretmen.model';
import { getEntities } from './ogretmen.reducer';

export const Ogretmen = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ogretmenList = useAppSelector(state => state.ogretmen.entities);
  const loading = useAppSelector(state => state.ogretmen.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ogretmen-heading" data-cy="OgretmenHeading">
        <Translate contentKey="exjhipster03App.ogretmen.home.title">Ogretmen</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="exjhipster03App.ogretmen.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ogretmen/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="exjhipster03App.ogretmen.home.createLabel">Create new Ogretmen</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ogretmenList && ogretmenList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="exjhipster03App.ogretmen.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogretmen.adiSoyadi">Adi Soyadi</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogretmen.brans">Brans</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ogretmenList.map((ogretmen, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ogretmen/${ogretmen.id}`} color="link" size="sm">
                      {ogretmen.id}
                    </Button>
                  </td>
                  <td>{ogretmen.adiSoyadi}</td>
                  <td>
                    <Translate contentKey={`exjhipster03App.Brans.${ogretmen.brans}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ogretmen/${ogretmen.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ogretmen/${ogretmen.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ogretmen/${ogretmen.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="exjhipster03App.ogretmen.home.notFound">No Ogretmen found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ogretmen;
