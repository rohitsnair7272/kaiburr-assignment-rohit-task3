package com.kaiburr_rohit.kaiburr_rohit.repository;

import com.kaiburr_rohit.kaiburr_rohit.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByNameContaining(String name);
    List<Task> findByIdContaining(String id);
}
