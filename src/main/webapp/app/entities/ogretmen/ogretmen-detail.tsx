import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ogretmen.reducer';

export const OgretmenDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ogretmenEntity = useAppSelector(state => state.ogretmen.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ogretmenDetailsHeading">
          <Translate contentKey="exjhipster03App.ogretmen.detail.title">Ogretmen</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ogretmenEntity.id}</dd>
          <dt>
            <span id="adiSoyadi">
              <Translate contentKey="exjhipster03App.ogretmen.adiSoyadi">Adi Soyadi</Translate>
            </span>
          </dt>
          <dd>{ogretmenEntity.adiSoyadi}</dd>
          <dt>
            <span id="brans">
              <Translate contentKey="exjhipster03App.ogretmen.brans">Brans</Translate>
            </span>
          </dt>
          <dd>{ogretmenEntity.brans}</dd>
        </dl>
        <Button tag={Link} to="/ogretmen" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ogretmen/${ogretmenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OgretmenDetail;
