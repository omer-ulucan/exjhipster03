import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOgretmen } from 'app/shared/model/ogretmen.model';
import { getEntities as getOgretmen } from 'app/entities/ogretmen/ogretmen.reducer';
import { ISinif } from 'app/shared/model/sinif.model';
import { Brans } from 'app/shared/model/enumerations/brans.model';
import { getEntity, updateEntity, createEntity, reset } from './sinif.reducer';

export const SinifUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const ogretmen = useAppSelector(state => state.ogretmen.entities);
  const sinifEntity = useAppSelector(state => state.sinif.entity);
  const loading = useAppSelector(state => state.sinif.loading);
  const updating = useAppSelector(state => state.sinif.updating);
  const updateSuccess = useAppSelector(state => state.sinif.updateSuccess);
  const bransValues = Object.keys(Brans);

  const handleClose = () => {
    navigate('/sinif');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getOgretmen({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...sinifEntity,
      ...values,
      ogretmen: ogretmen.find(it => it.id.toString() === values.ogretmen.toString()),
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
          ...sinifEntity,
          ogretmen: sinifEntity?.ogretmen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="exjhipster03App.sinif.home.createOrEditLabel" data-cy="SinifCreateUpdateHeading">
            <Translate contentKey="exjhipster03App.sinif.home.createOrEditLabel">Create or edit a Sinif</Translate>
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
                  id="sinif-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('exjhipster03App.sinif.sinifAdi')}
                id="sinif-sinifAdi"
                name="sinifAdi"
                data-cy="sinifAdi"
                type="text"
              />
              <ValidatedField
                label={translate('exjhipster03App.sinif.sinifKodu')}
                id="sinif-sinifKodu"
                name="sinifKodu"
                data-cy="sinifKodu"
                type="text"
              />
              <ValidatedField label={translate('exjhipster03App.sinif.brans')} id="sinif-brans" name="brans" data-cy="brans" type="select">
                {bransValues.map(brans => (
                  <option value={brans} key={brans}>
                    {translate('exjhipster03App.Brans.' + brans)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="sinif-ogretmen"
                name="ogretmen"
                data-cy="ogretmen"
                label={translate('exjhipster03App.sinif.ogretmen')}
                type="select"
              >
                <option value="" key="0" />
                {ogretmen
                  ? ogretmen.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sinif" replace color="info">
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

export default SinifUpdate;
