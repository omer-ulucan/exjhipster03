import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISinif } from 'app/shared/model/sinif.model';
import { getEntities as getSinifs } from 'app/entities/sinif/sinif.reducer';
import { IOgretmen } from 'app/shared/model/ogretmen.model';
import { Brans } from 'app/shared/model/enumerations/brans.model';
import { getEntity, updateEntity, createEntity, reset } from './ogretmen.reducer';

export const OgretmenUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sinifs = useAppSelector(state => state.sinif.entities);
  const ogretmenEntity = useAppSelector(state => state.ogretmen.entity);
  const loading = useAppSelector(state => state.ogretmen.loading);
  const updating = useAppSelector(state => state.ogretmen.updating);
  const updateSuccess = useAppSelector(state => state.ogretmen.updateSuccess);
  const bransValues = Object.keys(Brans);

  const handleClose = () => {
    navigate('/ogretmen');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSinifs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ogretmenEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          brans: 'FRENCH',
          ...ogretmenEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="exjhipster03App.ogretmen.home.createOrEditLabel" data-cy="OgretmenCreateUpdateHeading">
            <Translate contentKey="exjhipster03App.ogretmen.home.createOrEditLabel">Create or edit a Ogretmen</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ogretmen-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('exjhipster03App.ogretmen.adiSoyadi')}
                id="ogretmen-adiSoyadi"
                name="adiSoyadi"
                data-cy="adiSoyadi"
                type="text"
              />
              <ValidatedField
                label={translate('exjhipster03App.ogretmen.brans')}
                id="ogretmen-brans"
                name="brans"
                data-cy="brans"
                type="select"
              >
                {bransValues.map(brans => (
                  <option value={brans} key={brans}>
                    {translate('exjhipster03App.Brans.' + brans)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ogretmen" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OgretmenUpdate;
