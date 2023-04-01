package com.canada.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ogrenci.
 */
@Entity
@Table(name = "ogrenci")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ogrenci implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "adi_soyadi")
    private String adiSoyadi;

    @Column(name = "ogr_no")
    private Integer ogrNo;

    @Column(name = "cinsiyeti")
    private Boolean cinsiyeti;

    @Column(name = "dogum_tarihi")
    private Instant dogumTarihi;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ogretmen", "ogrencis" }, allowSetters = true)
    private Sinif sinif;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ogrenci id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdiSoyadi() {
        return this.adiSoyadi;
    }

    public Ogrenci adiSoyadi(String adiSoyadi) {
        this.setAdiSoyadi(adiSoyadi);
        return this;
    }

    public void setAdiSoyadi(String adiSoyadi) {
        this.adiSoyadi = adiSoyadi;
    }

    public Integer getOgrNo() {
        return this.ogrNo;
    }

    public Ogrenci ogrNo(Integer ogrNo) {
        this.setOgrNo(ogrNo);
        return this;
    }

    public void setOgrNo(Integer ogrNo) {
        this.ogrNo = ogrNo;
    }

    public Boolean getCinsiyeti() {
        return this.cinsiyeti;
    }

    public Ogrenci cinsiyeti(Boolean cinsiyeti) {
        this.setCinsiyeti(cinsiyeti);
        return this;
    }

    public void setCinsiyeti(Boolean cinsiyeti) {
        this.cinsiyeti = cinsiyeti;
    }

    public Instant getDogumTarihi() {
        return this.dogumTarihi;
    }

    public Ogrenci dogumTarihi(Instant dogumTarihi) {
        this.setDogumTarihi(dogumTarihi);
        return this;
    }

    public void setDogumTarihi(Instant dogumTarihi) {
        this.dogumTarihi = dogumTarihi;
    }

    public Sinif getSinif() {
        return this.sinif;
    }

    public void setSinif(Sinif sinif) {
        this.sinif = sinif;
    }

    public Ogrenci sinif(Sinif sinif) {
        this.setSinif(sinif);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ogrenci)) {
            return false;
        }
        return id != null && id.equals(((Ogrenci) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ogrenci{" +
            "id=" + getId() +
            ", adiSoyadi='" + getAdiSoyadi() + "'" +
            ", ogrNo=" + getOgrNo() +
            ", cinsiyeti='" + getCinsiyeti() + "'" +
            ", dogumTarihi='" + getDogumTarihi() + "'" +
            "}";
    }
}
