package com.canada.app.repository;

import com.canada.app.domain.Ogrenci;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ogrenci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgrenciRepository extends JpaRepository<Ogrenci, Long> {}
