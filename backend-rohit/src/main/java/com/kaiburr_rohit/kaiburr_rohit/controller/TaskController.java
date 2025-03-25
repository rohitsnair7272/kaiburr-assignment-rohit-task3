package com.kaiburr_rohit.kaiburr_rohit.controller;

import com.kaiburr_rohit.kaiburr_rohit.model.Task;
import com.kaiburr_rohit.kaiburr_rohit.model.TaskExecution;
import com.kaiburr_rohit.kaiburr_rohit.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TaskController {

    @Autowired
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new task
    @PostMapping
    public ResponseEntity<String> createTask(@RequestBody Task task) {
        if (task.getCommand() == null || task.getCommand().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Task creation failed: Command cannot be empty!");
        }
        if (isUnsafeCommand(task.getCommand())) {
            return ResponseEntity.badRequest().body("Task creation failed: Unsafe command detected!");
        }
        taskRepository.save(task);
        return ResponseEntity.ok("Task created successfully!");
    }

    // Update a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setName(updatedTask.getName());
            existingTask.setOwner(updatedTask.getOwner());
            existingTask.setCommand(updatedTask.getCommand());
            Task savedTask = taskRepository.save(existingTask);
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.ok("Task deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

  // Search tasks by name
  @GetMapping("/search")
  public ResponseEntity<List<Task>> searchTasksByName(@RequestParam String type , @RequestParam String name) {
        if(type.equals("id")){
            List<Task> tasks = taskRepository.findByIdContaining(name);
            if (tasks.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(tasks);
        }else{
            List<Task> tasks = taskRepository.findByNameContaining(name);
            if (tasks.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(tasks);
        }
      
  }


    // ✅ Execute task command and store execution details
    @PutMapping("/{id}/execute")
    public ResponseEntity<TaskExecution> executeTask(@PathVariable String id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();
        String command = task.getCommand();

        // ✅ Check if the command is empty or null
        if (command == null || command.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new TaskExecution(null, null, "Command cannot be empty!"));
        }

        // ✅ Security Check: Block unsafe commands
        if (isUnsafeCommand(command)) {
            return ResponseEntity.badRequest().body(new TaskExecution(null, null, "Unsafe command blocked!"));
        }

        try {
            Date startTime = new Date();
            String output = runCommand(command);
            Date endTime = new Date();

            TaskExecution execution = new TaskExecution(startTime, endTime, output);

            if (task.getTaskExecutions() == null) {
                task.setTaskExecutions(new ArrayList<>());
            }
            task.getTaskExecutions().add(execution);
            taskRepository.save(task);

            return ResponseEntity.ok(execution);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new TaskExecution(null, null, "Error executing command: " + e.getMessage()));
        }
    }

    // ✅ Helper function to run shell commands securely
    private String runCommand(String command) throws IOException, InterruptedException {
        ProcessBuilder processBuilder;
    
        // Check OS and use appropriate shell
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            processBuilder = new ProcessBuilder("cmd.exe", "/c", command);
        } else {
            processBuilder = new ProcessBuilder("bash", "-c", command);
        }
    
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
    
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
    
        process.waitFor();
        return output.toString();
    }
    
    // ✅ Fetch execution history for all tasks
    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getTaskHistory() {
        List<Task> tasks = taskRepository.findAll();
        List<Map<String, Object>> history = new ArrayList<>();

        for (Task task : tasks) {
            if (task.getTaskExecutions() != null) {
                for (TaskExecution execution : task.getTaskExecutions()) {
                    Map<String, Object> taskData = new HashMap<>();
                    taskData.put("id", task.getId());
                    taskData.put("name", task.getName()); // ✅ Include task name
                    taskData.put("startTime", execution.getStartTime());
                    taskData.put("endTime", execution.getEndTime());
                    taskData.put("output", execution.getOutput());
                    history.add(taskData);
                }
            }
        }

        if (history.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(history);
    }


    // ✅ Function to validate unsafe commands
    private boolean isUnsafeCommand(String command) {
        // Extended list of blocked commands
        List<String> blockedCommands = Arrays.asList(
            "rm", "shutdown", "reboot", "kill", "mkfs", "dd", "fdisk", "mv", "cp",
            "wget", "curl", "chmod", "chown", "ufw", "iptables", "service", "systemctl",
            "nohup", "pkill", "killall", "passwd", "adduser", "deluser", "userdel",
            "mount", "umount", "scp", "sftp", "netcat", "nc", "nmap", "mktemp", "unlink"
        );

        // Regex pattern to detect dangerous symbols (command injection)
        String unsafePattern = ".*(;|&&|\\|\\||`|\\$\\(|>|>>|<|<<).*";

        // Validate command
        boolean isBlacklisted = blockedCommands.stream().anyMatch(cmd -> command.matches(".*\\b" + cmd + "\\b.*"));
        boolean hasInjection = command.matches(unsafePattern);

        return isBlacklisted || hasInjection;
    }
}
