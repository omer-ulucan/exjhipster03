import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOgrenci } from 'app/shared/model/ogrenci.model';
import { getEntities } from './ogrenci.reducer';

export const Ogrenci = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ogrenciList = useAppSelector(state => state.ogrenci.entities);
  const loading = useAppSelector(state => state.ogrenci.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ogrenci-heading" data-cy="OgrenciHeading">
        <Translate contentKey="exjhipster03App.ogrenci.home.title">Ogrencis</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="exjhipster03App.ogrenci.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ogrenci/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="exjhipster03App.ogrenci.home.createLabel">Create new Ogrenci</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ogrenciList && ogrenciList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.adiSoyadi">Adi Soyadi</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.ogrNo">Ogr No</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.cinsiyeti">Cinsiyeti</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.dogumTarihi">Dogum Tarihi</Translate>
                </th>
                <th>
                  <Translate contentKey="exjhipster03App.ogrenci.sinif">Sinif</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ogrenciList.map((ogrenci, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ogrenci/${ogrenci.id}`} color="link" size="sm">
                      {ogrenci.id}
                    </Button>
                  </td>
                  <td>{ogrenci.adiSoyadi}</td>
                  <td>{ogrenci.ogrNo}</td>
                  <td>{ogrenci.cinsiyeti ? 'true' : 'false'}</td>
                  <td>{ogrenci.dogumTarihi ? <TextFormat type="date" value={ogrenci.dogumTarihi} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{ogrenci.sinif ? <Link to={`/sinif/${ogrenci.sinif.id}`}>{ogrenci.sinif.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ogrenci/${ogrenci.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ogrenci/${ogrenci.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ogrenci/${ogrenci.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="exjhipster03App.ogrenci.home.notFound">No Ogrencis found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ogrenci;
