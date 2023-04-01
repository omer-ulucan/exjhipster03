package com.canada.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.canada.app.IntegrationTest;
import com.canada.app.domain.Sinif;
import com.canada.app.domain.enumeration.Brans;
import com.canada.app.repository.SinifRepository;
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
 * Integration tests for the {@link SinifResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SinifResourceIT {

    private static final String DEFAULT_SINIF_ADI = "AAAAAAAAAA";
    private static final String UPDATED_SINIF_ADI = "BBBBBBBBBB";

    private static final String DEFAULT_SINIF_KODU = "AAAAAAAAAA";
    private static final String UPDATED_SINIF_KODU = "BBBBBBBBBB";

    private static final Brans DEFAULT_BRANS = Brans.FRENCH;
    private static final Brans UPDATED_BRANS = Brans.ENGLISH;

    private static final String ENTITY_API_URL = "/api/sinifs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SinifRepository sinifRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSinifMockMvc;

    private Sinif sinif;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sinif createEntity(EntityManager em) {
        Sinif sinif = new Sinif().sinifAdi(DEFAULT_SINIF_ADI).sinifKodu(DEFAULT_SINIF_KODU).brans(DEFAULT_BRANS);
        return sinif;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sinif createUpdatedEntity(EntityManager em) {
        Sinif sinif = new Sinif().sinifAdi(UPDATED_SINIF_ADI).sinifKodu(UPDATED_SINIF_KODU).brans(UPDATED_BRANS);
        return sinif;
    }

    @BeforeEach
    public void initTest() {
        sinif = createEntity(em);
    }

    @Test
    @Transactional
    void createSinif() throws Exception {
        int databaseSizeBeforeCreate = sinifRepository.findAll().size();
        // Create the Sinif
        restSinifMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sinif)))
            .andExpect(status().isCreated());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeCreate + 1);
        Sinif testSinif = sinifList.get(sinifList.size() - 1);
        assertThat(testSinif.getSinifAdi()).isEqualTo(DEFAULT_SINIF_ADI);
        assertThat(testSinif.getSinifKodu()).isEqualTo(DEFAULT_SINIF_KODU);
        assertThat(testSinif.getBrans()).isEqualTo(DEFAULT_BRANS);
    }

    @Test
    @Transactional
    void createSinifWithExistingId() throws Exception {
        // Create the Sinif with an existing ID
        sinif.setId(1L);

        int databaseSizeBeforeCreate = sinifRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSinifMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sinif)))
            .andExpect(status().isBadRequest());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSinifs() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        // Get all the sinifList
        restSinifMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sinif.getId().intValue())))
            .andExpect(jsonPath("$.[*].sinifAdi").value(hasItem(DEFAULT_SINIF_ADI)))
            .andExpect(jsonPath("$.[*].sinifKodu").value(hasItem(DEFAULT_SINIF_KODU)))
            .andExpect(jsonPath("$.[*].brans").value(hasItem(DEFAULT_BRANS.toString())));
    }

    @Test
    @Transactional
    void getSinif() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        // Get the sinif
        restSinifMockMvc
            .perform(get(ENTITY_API_URL_ID, sinif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sinif.getId().intValue()))
            .andExpect(jsonPath("$.sinifAdi").value(DEFAULT_SINIF_ADI))
            .andExpect(jsonPath("$.sinifKodu").value(DEFAULT_SINIF_KODU))
            .andExpect(jsonPath("$.brans").value(DEFAULT_BRANS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingSinif() throws Exception {
        // Get the sinif
        restSinifMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSinif() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();

        // Update the sinif
        Sinif updatedSinif = sinifRepository.findById(sinif.getId()).get();
        // Disconnect from session so that the updates on updatedSinif are not directly saved in db
        em.detach(updatedSinif);
        updatedSinif.sinifAdi(UPDATED_SINIF_ADI).sinifKodu(UPDATED_SINIF_KODU).brans(UPDATED_BRANS);

        restSinifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSinif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSinif))
            )
            .andExpect(status().isOk());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
        Sinif testSinif = sinifList.get(sinifList.size() - 1);
        assertThat(testSinif.getSinifAdi()).isEqualTo(UPDATED_SINIF_ADI);
        assertThat(testSinif.getSinifKodu()).isEqualTo(UPDATED_SINIF_KODU);
        assertThat(testSinif.getBrans()).isEqualTo(UPDATED_BRANS);
    }

    @Test
    @Transactional
    void putNonExistingSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sinif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sinif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sinif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sinif)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSinifWithPatch() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();

        // Update the sinif using partial update
        Sinif partialUpdatedSinif = new Sinif();
        partialUpdatedSinif.setId(sinif.getId());

        partialUpdatedSinif.sinifKodu(UPDATED_SINIF_KODU).brans(UPDATED_BRANS);

        restSinifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSinif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSinif))
            )
            .andExpect(status().isOk());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
        Sinif testSinif = sinifList.get(sinifList.size() - 1);
        assertThat(testSinif.getSinifAdi()).isEqualTo(DEFAULT_SINIF_ADI);
        assertThat(testSinif.getSinifKodu()).isEqualTo(UPDATED_SINIF_KODU);
        assertThat(testSinif.getBrans()).isEqualTo(UPDATED_BRANS);
    }

    @Test
    @Transactional
    void fullUpdateSinifWithPatch() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();

        // Update the sinif using partial update
        Sinif partialUpdatedSinif = new Sinif();
        partialUpdatedSinif.setId(sinif.getId());

        partialUpdatedSinif.sinifAdi(UPDATED_SINIF_ADI).sinifKodu(UPDATED_SINIF_KODU).brans(UPDATED_BRANS);

        restSinifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSinif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSinif))
            )
            .andExpect(status().isOk());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
        Sinif testSinif = sinifList.get(sinifList.size() - 1);
        assertThat(testSinif.getSinifAdi()).isEqualTo(UPDATED_SINIF_ADI);
        assertThat(testSinif.getSinifKodu()).isEqualTo(UPDATED_SINIF_KODU);
        assertThat(testSinif.getBrans()).isEqualTo(UPDATED_BRANS);
    }

    @Test
    @Transactional
    void patchNonExistingSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sinif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sinif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sinif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSinif() throws Exception {
        int databaseSizeBeforeUpdate = sinifRepository.findAll().size();
        sinif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSinifMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sinif)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sinif in the database
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSinif() throws Exception {
        // Initialize the database
        sinifRepository.saveAndFlush(sinif);

        int databaseSizeBeforeDelete = sinifRepository.findAll().size();

        // Delete the sinif
        restSinifMockMvc
            .perform(delete(ENTITY_API_URL_ID, sinif.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sinif> sinifList = sinifRepository.findAll();
        assertThat(sinifList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
