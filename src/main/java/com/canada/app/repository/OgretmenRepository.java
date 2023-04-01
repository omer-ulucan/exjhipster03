package com.canada.app.repository;

import com.canada.app.domain.Ogretmen;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ogretmen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgretmenRepository extends JpaRepository<Ogretmen, Long> {}
