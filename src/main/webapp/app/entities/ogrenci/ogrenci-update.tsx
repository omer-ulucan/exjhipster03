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
import { IOgrenci } from 'app/shared/model/ogrenci.model';
import { getEntity, updateEntity, createEntity, reset } from './ogrenci.reducer';

export const OgrenciUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sinifs = useAppSelector(state => state.sinif.entities);
  const ogrenciEntity = useAppSelector(state => state.ogrenci.entity);
  const loading = useAppSelector(state => state.ogrenci.loading);
  const updating = useAppSelector(state => state.ogrenci.updating);
  const updateSuccess = useAppSelector(state => state.ogrenci.updateSuccess);

  const handleClose = () => {
    navigate('/ogrenci');
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
    values.dogumTarihi = convertDateTimeToServer(values.dogumTarihi);

    const entity = {
      ...ogrenciEntity,
      ...values,
      sinif: sinifs.find(it => it.id.toString() === values.sinif.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dogumTarihi: displayDefaultDateTime(),
        }
      : {
          ...ogrenciEntity,
          dogumTarihi: convertDateTimeFromServer(ogrenciEntity.dogumTarihi),
          sinif: ogrenciEntity?.sinif?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="exjhipster03App.ogrenci.home.createOrEditLabel" data-cy="OgrenciCreateUpdateHeading">
            <Translate contentKey="exjhipster03App.ogrenci.home.createOrEditLabel">Create or edit a Ogrenci</Translate>
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
                  id="ogrenci-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('exjhipster03App.ogrenci.adiSoyadi')}
                id="ogrenci-adiSoyadi"
                name="adiSoyadi"
                data-cy="adiSoyadi"
                type="text"
              />
              <ValidatedField
                label={translate('exjhipster03App.ogrenci.ogrNo')}
                id="ogrenci-ogrNo"
                name="ogrNo"
                data-cy="ogrNo"
                type="text"
              />
              <ValidatedField
                label={translate('exjhipster03App.ogrenci.cinsiyeti')}
                id="ogrenci-cinsiyeti"
                name="cinsiyeti"
                data-cy="cinsiyeti"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('exjhipster03App.ogrenci.dogumTarihi')}
                id="ogrenci-dogumTarihi"
                name="dogumTarihi"
                data-cy="dogumTarihi"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="ogrenci-sinif"
                name="sinif"
                data-cy="sinif"
                label={translate('exjhipster03App.ogrenci.sinif')}
                type="select"
              >
                <option value="" key="0" />
                {sinifs
                  ? sinifs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ogrenci" replace color="info">
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

export default OgrenciUpdate;
