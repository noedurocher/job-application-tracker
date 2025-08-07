package com.example.jobApp.backend.controller;

import com.example.jobApp.backend.model.JobApplication;
import com.example.jobApp.backend.model.User;
import com.example.jobApp.backend.repository.JobApplicationRepository;
import com.example.jobApp.backend.repository.UserRepository;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
public class JobApplicationController {
    private final JobApplicationRepository repository;
    private final UserRepository userRepository;

    public JobApplicationController(UserRepository userRepository, JobApplicationRepository repository){
        this.repository=repository;
        this.userRepository=userRepository;
    }

    @GetMapping("/all")
    public List<JobApplication> getAll(){
        return repository.findAll();
    }

    @GetMapping("/id/{id}")
    public Optional<JobApplication> getJobApplicationById(@PathVariable Long id){
        return repository.findById(id);
    }

    @GetMapping("/title/{title}")
    public List<JobApplication> getJobApplicationByTitle(@PathVariable String title){
        return repository.findByTitle(title);
    }

    @GetMapping("/companies/{company}")
    public List<JobApplication> getJobApplicationByCompany(@PathVariable String company){
        return repository.findByCompany(company);
    }

    @GetMapping("/status/{status}")
    public List<JobApplication> getJobApplicationByStatus(@PathVariable String status){
        return repository.findByStatus(status);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> create(@PathVariable Long userId, @RequestBody JobApplication jobApplication){
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user ID.");
        }
        jobApplication.setUser(optionalUser.get());
        JobApplication jobs = repository.save(jobApplication);
        return ResponseEntity.ok(jobs);
        //return repository.save(jobApplication);
    }


//    @PutMapping("/id/{id}")
//    public JobApplication update(@PathVariable Long id, @RequestBody JobApplication jobApplication){
//        jobApplication.setId(id);
//        return repository.save(jobApplication);
//    }
//
//    @DeleteMapping("/id/{id}")
//    public void delete(@PathVariable Long id){
//        repository.deleteById(id);
//    }
//
//    @PostMapping("/{userId}/jobApplications")
//    public JobApplication createJobApplication(@PathVariable Long userId, @RequestBody JobApplication jobApplication){
//        User user = userRepository.findById(userId)
//                .orElseThrow(()-> new RuntimeException("User not found"));
//        jobApplication.setUser(user);
//        return repository.save(jobApplication);
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobApplication>> getJobApplicationByUsername(@PathVariable Long userId){
        List<JobApplication> jobs = repository.findByUserId(userId);
        return ResponseEntity.ok(jobs);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.ok("Successfully delete Job");
    }

}
