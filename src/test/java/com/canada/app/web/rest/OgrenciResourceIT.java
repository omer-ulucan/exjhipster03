package com.canada.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.canada.app.IntegrationTest;
import com.canada.app.domain.Ogrenci;
import com.canada.app.repository.OgrenciRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link OgrenciResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OgrenciResourceIT {

    private static final String DEFAULT_ADI_SOYADI = "AAAAAAAAAA";
    private static final String UPDATED_ADI_SOYADI = "BBBBBBBBBB";

    private static final Integer DEFAULT_OGR_NO = 1;
    private static final Integer UPDATED_OGR_NO = 2;

    private static final Boolean DEFAULT_CINSIYETI = false;
    private static final Boolean UPDATED_CINSIYETI = true;

    private static final Instant DEFAULT_DOGUM_TARIHI = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DOGUM_TARIHI = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/ogrencis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OgrenciRepository ogrenciRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOgrenciMockMvc;

    private Ogrenci ogrenci;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ogrenci createEntity(EntityManager em) {
        Ogrenci ogrenci = new Ogrenci()
            .adiSoyadi(DEFAULT_ADI_SOYADI)
            .ogrNo(DEFAULT_OGR_NO)
            .cinsiyeti(DEFAULT_CINSIYETI)
            .dogumTarihi(DEFAULT_DOGUM_TARIHI);
        return ogrenci;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ogrenci createUpdatedEntity(EntityManager em) {
        Ogrenci ogrenci = new Ogrenci()
            .adiSoyadi(UPDATED_ADI_SOYADI)
            .ogrNo(UPDATED_OGR_NO)
            .cinsiyeti(UPDATED_CINSIYETI)
            .dogumTarihi(UPDATED_DOGUM_TARIHI);
        return ogrenci;
    }

    @BeforeEach
    public void initTest() {
        ogrenci = createEntity(em);
    }

    @Test
    @Transactional
    void createOgrenci() throws Exception {
        int databaseSizeBeforeCreate = ogrenciRepository.findAll().size();
        // Create the Ogrenci
        restOgrenciMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ogrenci)))
            .andExpect(status().isCreated());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeCreate + 1);
        Ogrenci testOgrenci = ogrenciList.get(ogrenciList.size() - 1);
        assertThat(testOgrenci.getAdiSoyadi()).isEqualTo(DEFAULT_ADI_SOYADI);
        assertThat(testOgrenci.getOgrNo()).isEqualTo(DEFAULT_OGR_NO);
        assertThat(testOgrenci.getCinsiyeti()).isEqualTo(DEFAULT_CINSIYETI);
        assertThat(testOgrenci.getDogumTarihi()).isEqualTo(DEFAULT_DOGUM_TARIHI);
    }

    @Test
    @Transactional
    void createOgrenciWithExistingId() throws Exception {
        // Create the Ogrenci with an existing ID
        ogrenci.setId(1L);

        int databaseSizeBeforeCreate = ogrenciRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgrenciMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ogrenci)))
            .andExpect(status().isBadRequest());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOgrencis() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        // Get all the ogrenciList
        restOgrenciMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogrenci.getId().intValue())))
            .andExpect(jsonPath("$.[*].adiSoyadi").value(hasItem(DEFAULT_ADI_SOYADI)))
            .andExpect(jsonPath("$.[*].ogrNo").value(hasItem(DEFAULT_OGR_NO)))
            .andExpect(jsonPath("$.[*].cinsiyeti").value(hasItem(DEFAULT_CINSIYETI.booleanValue())))
            .andExpect(jsonPath("$.[*].dogumTarihi").value(hasItem(DEFAULT_DOGUM_TARIHI.toString())));
    }

    @Test
    @Transactional
    void getOgrenci() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        // Get the ogrenci
        restOgrenciMockMvc
            .perform(get(ENTITY_API_URL_ID, ogrenci.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ogrenci.getId().intValue()))
            .andExpect(jsonPath("$.adiSoyadi").value(DEFAULT_ADI_SOYADI))
            .andExpect(jsonPath("$.ogrNo").value(DEFAULT_OGR_NO))
            .andExpect(jsonPath("$.cinsiyeti").value(DEFAULT_CINSIYETI.booleanValue()))
            .andExpect(jsonPath("$.dogumTarihi").value(DEFAULT_DOGUM_TARIHI.toString()));
    }

    @Test
    @Transactional
    void getNonExistingOgrenci() throws Exception {
        // Get the ogrenci
        restOgrenciMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOgrenci() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();

        // Update the ogrenci
        Ogrenci updatedOgrenci = ogrenciRepository.findById(ogrenci.getId()).get();
        // Disconnect from session so that the updates on updatedOgrenci are not directly saved in db
        em.detach(updatedOgrenci);
        updatedOgrenci.adiSoyadi(UPDATED_ADI_SOYADI).ogrNo(UPDATED_OGR_NO).cinsiyeti(UPDATED_CINSIYETI).dogumTarihi(UPDATED_DOGUM_TARIHI);

        restOgrenciMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOgrenci.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOgrenci))
            )
            .andExpect(status().isOk());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
        Ogrenci testOgrenci = ogrenciList.get(ogrenciList.size() - 1);
        assertThat(testOgrenci.getAdiSoyadi()).isEqualTo(UPDATED_ADI_SOYADI);
        assertThat(testOgrenci.getOgrNo()).isEqualTo(UPDATED_OGR_NO);
        assertThat(testOgrenci.getCinsiyeti()).isEqualTo(UPDATED_CINSIYETI);
        assertThat(testOgrenci.getDogumTarihi()).isEqualTo(UPDATED_DOGUM_TARIHI);
    }

    @Test
    @Transactional
    void putNonExistingOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ogrenci.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ogrenci))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ogrenci))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ogrenci)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOgrenciWithPatch() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();

        // Update the ogrenci using partial update
        Ogrenci partialUpdatedOgrenci = new Ogrenci();
        partialUpdatedOgrenci.setId(ogrenci.getId());

        partialUpdatedOgrenci.adiSoyadi(UPDATED_ADI_SOYADI).ogrNo(UPDATED_OGR_NO).dogumTarihi(UPDATED_DOGUM_TARIHI);

        restOgrenciMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOgrenci.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOgrenci))
            )
            .andExpect(status().isOk());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
        Ogrenci testOgrenci = ogrenciList.get(ogrenciList.size() - 1);
        assertThat(testOgrenci.getAdiSoyadi()).isEqualTo(UPDATED_ADI_SOYADI);
        assertThat(testOgrenci.getOgrNo()).isEqualTo(UPDATED_OGR_NO);
        assertThat(testOgrenci.getCinsiyeti()).isEqualTo(DEFAULT_CINSIYETI);
        assertThat(testOgrenci.getDogumTarihi()).isEqualTo(UPDATED_DOGUM_TARIHI);
    }

    @Test
    @Transactional
    void fullUpdateOgrenciWithPatch() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();

        // Update the ogrenci using partial update
        Ogrenci partialUpdatedOgrenci = new Ogrenci();
        partialUpdatedOgrenci.setId(ogrenci.getId());

        partialUpdatedOgrenci
            .adiSoyadi(UPDATED_ADI_SOYADI)
            .ogrNo(UPDATED_OGR_NO)
            .cinsiyeti(UPDATED_CINSIYETI)
            .dogumTarihi(UPDATED_DOGUM_TARIHI);

        restOgrenciMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOgrenci.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOgrenci))
            )
            .andExpect(status().isOk());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
        Ogrenci testOgrenci = ogrenciList.get(ogrenciList.size() - 1);
        assertThat(testOgrenci.getAdiSoyadi()).isEqualTo(UPDATED_ADI_SOYADI);
        assertThat(testOgrenci.getOgrNo()).isEqualTo(UPDATED_OGR_NO);
        assertThat(testOgrenci.getCinsiyeti()).isEqualTo(UPDATED_CINSIYETI);
        assertThat(testOgrenci.getDogumTarihi()).isEqualTo(UPDATED_DOGUM_TARIHI);
    }

    @Test
    @Transactional
    void patchNonExistingOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ogrenci.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ogrenci))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ogrenci))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOgrenci() throws Exception {
        int databaseSizeBeforeUpdate = ogrenciRepository.findAll().size();
        ogrenci.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOgrenciMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ogrenci)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ogrenci in the database
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOgrenci() throws Exception {
        // Initialize the database
        ogrenciRepository.saveAndFlush(ogrenci);

        int databaseSizeBeforeDelete = ogrenciRepository.findAll().size();

        // Delete the ogrenci
        restOgrenciMockMvc
            .perform(delete(ENTITY_API_URL_ID, ogrenci.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ogrenci> ogrenciList = ogrenciRepository.findAll();
        assertThat(ogrenciList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
