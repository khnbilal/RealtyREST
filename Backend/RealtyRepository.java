package com.realestate.realtyrest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealtyRepository extends JpaRepository<Realty, Long> {
public List<Realty> findByNumberOfBedrooms(Long NumberOfBedrooms);
}
