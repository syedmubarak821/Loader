package com.tms.loader.repositories.driver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.tms.loader.entities.driver.DriverStatus;

import jakarta.transaction.Transactional;


public interface DriverStatusRepo extends JpaRepository<DriverStatus, Integer> {
	@Transactional
	@Modifying
	@Query("update DriverStatus ds set ds.status = ?1 where ds.statusId = ?2")
	int updateStatusById(String status,Integer id);
}
