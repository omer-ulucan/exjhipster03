package com.canada.app.domain;

import com.canada.app.domain.enumeration.Brans;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ogretmen.
 */
@Entity
@Table(name = "ogretmen")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ogretmen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "adi_soyadi")
    private String adiSoyadi;

    @Enumerated(EnumType.STRING)
    @Column(name = "brans")
    private Brans brans;

    @JsonIgnoreProperties(value = { "ogretmen", "ogrencis" }, allowSetters = true)
    @OneToOne(mappedBy = "ogretmen")
    private Sinif sinif;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ogretmen id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdiSoyadi() {
        return this.adiSoyadi;
    }

    public Ogretmen adiSoyadi(String adiSoyadi) {
        this.setAdiSoyadi(adiSoyadi);
        return this;
    }

    public void setAdiSoyadi(String adiSoyadi) {
        this.adiSoyadi = adiSoyadi;
    }

    public Brans getBrans() {
        return this.brans;
    }

    public Ogretmen brans(Brans brans) {
        this.setBrans(brans);
        return this;
    }

    public void setBrans(Brans brans) {
        this.brans = brans;
    }

    public Sinif getSinif() {
        return this.sinif;
    }

    public void setSinif(Sinif sinif) {
        if (this.sinif != null) {
            this.sinif.setOgretmen(null);
        }
        if (sinif != null) {
            sinif.setOgretmen(this);
        }
        this.sinif = sinif;
    }

    public Ogretmen sinif(Sinif sinif) {
        this.setSinif(sinif);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ogretmen)) {
            return false;
        }
        return id != null && id.equals(((Ogretmen) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ogretmen{" +
            "id=" + getId() +
            ", adiSoyadi='" + getAdiSoyadi() + "'" +
            ", brans='" + getBrans() + "'" +
            "}";
    }
}
