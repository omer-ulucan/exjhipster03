import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ogrenci.reducer';

export const OgrenciDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ogrenciEntity = useAppSelector(state => state.ogrenci.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ogrenciDetailsHeading">
          <Translate contentKey="exjhipster03App.ogrenci.detail.title">Ogrenci</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ogrenciEntity.id}</dd>
          <dt>
            <span id="adiSoyadi">
              <Translate contentKey="exjhipster03App.ogrenci.adiSoyadi">Adi Soyadi</Translate>
            </span>
          </dt>
          <dd>{ogrenciEntity.adiSoyadi}</dd>
          <dt>
            <span id="ogrNo">
              <Translate contentKey="exjhipster03App.ogrenci.ogrNo">Ogr No</Translate>
            </span>
          </dt>
          <dd>{ogrenciEntity.ogrNo}</dd>
          <dt>
            <span id="cinsiyeti">
              <Translate contentKey="exjhipster03App.ogrenci.cinsiyeti">Cinsiyeti</Translate>
            </span>
          </dt>
          <dd>{ogrenciEntity.cinsiyeti ? 'true' : 'false'}</dd>
          <dt>
            <span id="dogumTarihi">
              <Translate contentKey="exjhipster03App.ogrenci.dogumTarihi">Dogum Tarihi</Translate>
            </span>
          </dt>
          <dd>
            {ogrenciEntity.dogumTarihi ? <TextFormat value={ogrenciEntity.dogumTarihi} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="exjhipster03App.ogrenci.sinif">Sinif</Translate>
          </dt>
          <dd>{ogrenciEntity.sinif ? ogrenciEntity.sinif.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ogrenci" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ogrenci/${ogrenciEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OgrenciDetail;
