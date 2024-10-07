package com.realestate.realtyrest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealtyRepository extends JpaRepository<Realty, Long> {

}
