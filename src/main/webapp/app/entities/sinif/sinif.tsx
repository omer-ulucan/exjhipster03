import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISinif } from 'app/shared/model/sinif.model';
import { getEntities } from './sinif.reducer';

export const Sinif = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const sinifList = useAppSelector(state => state.sinif.entities);
  const loading = useAppSelector(state => state.sinif.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="sinif-heading" data-cy="SinifHeading">
        <Translate contentKey="exjhipster03App.sinif.home.title">Sinifs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="exjhipster03App.sinif.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/sinif/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="exjhipster03App.sinif.home.createLabel">Create new Sinif</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sinifList && sinifList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="exjhipster03App.sinif.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.sinif.sinifAdi">Sinif Adi</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.sinif.sinifKodu">Sinif Kodu</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.sinif.brans">Brans</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.sinif.ogretmen">Ogretmen</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sinifList.map((sinif, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/sinif/${sinif.id}`} color="link" size="sm">
                      {sinif.id}
                    </Button>
                  </td>
                  <td>{sinif.sinifAdi}</td>
                  <td>{sinif.sinifKodu}</td>
                  <td>
                    <Translate contentKey={`exjhipster03App.Brans.${sinif.brans}`} />
                  </td>
                  <td>{sinif.ogretmen ? <Link to={`/ogretmen/${sinif.ogretmen.id}`}>{sinif.ogretmen.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/sinif/${sinif.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/sinif/${sinif.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/sinif/${sinif.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="exjhipster03App.sinif.home.notFound">No Sinifs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sinif;
