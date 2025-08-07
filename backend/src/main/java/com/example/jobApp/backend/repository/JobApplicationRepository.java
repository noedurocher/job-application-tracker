package com.example.jobApp.backend.repository;

import com.example.jobApp.backend.model.JobApplication;
import com.example.jobApp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByTitle(String title);
    List<JobApplication> findByCompany(String company);
    List<JobApplication> findByStatus(String status);
    List<JobApplication> findByUserUsername(String username);
    List<JobApplication> findByUserId(Long userId);

}
