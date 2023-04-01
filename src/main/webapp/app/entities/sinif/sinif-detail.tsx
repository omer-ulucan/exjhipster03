import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sinif.reducer';

export const SinifDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sinifEntity = useAppSelector(state => state.sinif.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sinifDetailsHeading">
          <Translate contentKey="exjhipster03App.sinif.detail.title">Sinif</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sinifEntity.id}</dd>
          <dt>
            <span id="sinifAdi">
              <Translate contentKey="exjhipster03App.sinif.sinifAdi">Sinif Adi</Translate>
            </span>
          </dt>
          <dd>{sinifEntity.sinifAdi}</dd>
          <dt>
            <span id="sinifKodu">
              <Translate contentKey="exjhipster03App.sinif.sinifKodu">Sinif Kodu</Translate>
            </span>
          </dt>
          <dd>{sinifEntity.sinifKodu}</dd>
          <dt>
            <span id="brans">
              <Translate contentKey="exjhipster03App.sinif.brans">Brans</Translate>
            </span>
          </dt>
          <dd>{sinifEntity.brans}</dd>
          <dt>
            <Translate contentKey="exjhipster03App.sinif.ogretmen">Ogretmen</Translate>
          </dt>
          <dd>{sinifEntity.ogretmen ? sinifEntity.ogretmen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sinif" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sinif/${sinifEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SinifDetail;
