# CodeClash Judge

A secure, scalable, Docker-based online code judging engine for competitive programming platforms.

CodeClash Judge compiles, executes, and evaluates programming submissions inside isolated Docker containers. It currently supports C++ and Python, with asynchronous job processing powered by BullMQ and Redis.

## Features

- Secure Docker-based code execution
- Asynchronous job processing with BullMQ
- Redis-backed queueing
- Multiple test case support
- Configurable execution time limit
- Output Limit Exceeded (OLE) detection
- Compilation error detection
- Runtime error detection
- Wrong Answer detection
- Accepted verdict generation
- Modular executor architecture
- Temporary workspace generation

## Supported Languages

| Language | Status    |
|----------|-----------|
| C++      | Supported |
| Python   | Supported |

More languages will be added in future releases.

## Tech Stack

| Category         | Technology |
|-------------------|------------|
| Runtime           | Node.js    |
| Framework         | Express.js |
| Queue             | BullMQ     |
| Message Broker    | Redis      |
| Containerization  | Docker     |
| Operating System  | Linux      |

## Architecture

```
                 User
                   │
                   ▼
             Express API
                   │
                   ▼
             BullMQ Queue
                   │
                 Redis
                   │
                   ▼
             Judge Worker
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   C++ Executor         Python Executor
        │                     │
        └──────────┬──────────┘
                    │
                    ▼
             Docker Sandbox
                    │
                    ▼
          Execute Test Cases
                    │
                    ▼
            Generate Verdict
```

## Workflow

1. User submits source code.
2. Backend validates the submission.
3. Submission is added to the BullMQ queue.
4. Worker picks the submission.
5. The appropriate language executor is selected.
6. Source code is compiled (when required).
7. The program executes inside a Docker container.
8. Output is compared against the expected output.
9. A verdict is generated and returned.

## Supported Verdicts

| Verdict               | Description                                       |
|------------------------|----------------------------------------------------|
| Accepted               | All test cases passed                              |
| Wrong Answer            | Output differs from the expected output            |
| Compilation Error      | Source code failed to compile                      |
| Runtime Error          | Program terminated unexpectedly                    |
| Time Limit Exceeded    | Program exceeded the configured execution time     |
| Output Limit Exceeded  | Program produced output larger than the configured limit |

## Current Progress

### Completed

- Docker sandbox execution
- BullMQ worker
- Redis integration
- C++ executor
- Python executor
- Multiple test case support
- Compilation handling
- Wrong Answer detection
- Runtime Error detection
- Accepted verdict
- Time Limit Exceeded (TLE)
- Output Limit Exceeded (OLE)
- Configurable execution time limit
- Modular executor architecture
- Temporary workspace generation

### Upcoming

- Hidden test cases
- Submission persistence
- Result persistence
- REST API integration
- Distributed judge workers
- JavaScript executor
- Java executor
- Go executor
- Rust executor

## Project Structure

```
codeclash-judge/
│
├── backend/
│
├── worker/
│   ├── src/
│   ├── executors/
│   │   ├── cpp/
│   │   └── python/
│   ├── queue/
│   ├── utils/
│   └── temp/
│
├── docker/
│
├── package.json
└── README.md
```

## Roadmap

### Phase 1 — Core Judge

- Docker sandbox
- BullMQ worker
- C++ support
- Python support
- Multiple test cases
- Time Limit Exceeded
- Output Limit Exceeded

### Phase 2 — Judge Improvements

- Memory Limit Exceeded
- Automatic workspace cleanup
- Hidden test cases
- Runtime statistics
- Memory usage reporting
- Improved logging

### Phase 3 — Backend

- PostgreSQL integration
- Submission storage
- Result storage
- REST API
- Authentication
- Problem management

### Phase 4 — Scalability

- JavaScript support
- Java support
- Go support
- Rust support
- Multiple judge workers
- Distributed judge cluster
- Live verdict updates
- Judge dashboard
- Performance monitoring

## Contributing

Contributions are welcome.

```bash
git clone https://github.com/your-username/codeclash-judge.git

cd codeclash-judge

git checkout -b feature/my-feature

git commit -m "Add new feature"

git push origin feature/my-feature
```

Open a Pull Request describing your changes.

## Author

**Sharyar Naveed**
Software Engineer and Backend Developer

Building CodeClash, a scalable competitive programming platform focused on secure and efficient code execution.
