package com.example.jobApp.backend.model;

import jakarta.persistence.*;

import java.util.Optional;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String status;
    @Column(name = "date_applied")
    private String dateApplied;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    //private Long userId;

    //Getters and Setters
    public Long getId(){return id;}
    public void setId(Long id) {this.id = id;}
    public String getTitle(){return title;}
    public void setTitle(String title){this.title = title;}
    public String getCompany(){return company;}
    public void setCompany(String company){this.company=company;}
    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
    public String getDateApplied(){return dateApplied;}
    public void setDateApplied(String dateApplied){this.dateApplied=dateApplied;}
    public String getNotes(){return notes;}
    public void setNotes(String notes){this.notes=notes;}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
