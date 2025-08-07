CREATE TABLE job_application (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      company VARCHAR(255),
      status VARCHAR(100),
      date_applied DATE,
      notes VARCHAR(1000)
  );