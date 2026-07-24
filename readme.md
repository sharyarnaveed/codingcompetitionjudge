# 🚀 CodeClash Judge

<p align="center">
  <strong>A secure, scalable, and Docker-based online code judging engine.</strong>
  <br />
  Built to execute, evaluate, and verify programming submissions in isolated environments with support for multiple test cases and automated verdict generation.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-Queue-DC382D?logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/BullMQ-Worker-orange" />
  <img src="https://img.shields.io/badge/Docker-Sandbox-2496ED?logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Under%20Development-yellow" />
</p>

---

# 📖 Overview

**CodeClash Judge** is the execution engine behind the **CodeClash** online programming platform.

It securely compiles and executes user-submitted programs inside isolated Docker containers, evaluates them against multiple test cases, and returns accurate verdicts such as **Accepted**, **Wrong Answer**, **Compilation Error**, **Runtime Error**, and **Time Limit Exceeded**.

The architecture follows a distributed worker model using **BullMQ** and **Redis**, making it scalable and easy to extend with additional languages and workers.

---

# ✨ Features

- 🔒 Secure Docker-based code execution
- ⚡ Queue-based asynchronous judging
- 🧪 Multiple test case evaluation
- ⏱ Time Limit Exceeded (TLE) detection
- 📊 Detailed execution verdicts
- 🧹 Automatic temporary file cleanup
- 🏗 Modular executor architecture
- 📦 Separate worker process
- 🚀 Easily scalable worker architecture
- 🛡 Isolated execution environment

---

# 🏗 System Architecture

```text
                    User
                      │
                      ▼
              Express Backend API
                      │
                      ▼
             Store Submission
                      │
                      ▼
                 BullMQ Queue
                      │
                 Redis Broker
                      │
                      ▼
               Judge Worker
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
    C++ Executor           Python Executor
          │                       │
          └───────────┬───────────┘
                      ▼
          Docker Container Runner
                      │
                      ▼
            Execute Test Cases
                      │
                      ▼
              Generate Verdict
                      │
                      ▼
              Update Submission
```

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Queue | BullMQ |
| Message Broker | Redis |
| Containerization | Docker |
| Operating System | Linux |
| Languages Supported | C++, Python |

---

# 📂 Project Structure

```text
codeclash-judge/

├── backend/
│
├── worker/
│   ├── src/
│   │
│   ├── executors/
│   │   ├── cpp/
│   │   └── python/
│   │
│   ├── queue/
│   │
│   ├── docker/
│   │
│   ├── utils/
│   │
│   └── temp/
│
├── docker/
│
├── README.md
│
└── package.json
```

---

# ⚙️ How It Works

## 1. User Submission

The backend receives:

- Source code
- Programming language
- Problem ID

---

## 2. Queue Submission

The submission is pushed into a BullMQ queue.

```text
Submission
      │
      ▼
 BullMQ Queue
```

---

## 3. Worker Processing

A dedicated worker continuously listens for incoming submissions.

```text
Queue
   │
   ▼
Worker
```

---

## 4. Source File Generation

The worker creates a temporary execution directory.

Example:

```text
main.cpp

or

main.py
```

---

## 5. Docker Execution

The source code is executed inside an isolated Docker container.

Benefits include:

- Sandboxed execution
- Security
- Process isolation
- Consistent runtime environment

---

## 6. Test Case Evaluation

Each submission is executed independently for every test case.

```text
Test Case 1
      │
      ▼
 Execute
      │
      ▼
 Compare Output
      │
      ▼
Test Case 2
      │
      ▼
 Execute
      │
      ▼
 Compare Output
      │
      ▼
...
      │
      ▼
Final Verdict
```

---

## 7. Result Generation

The judge returns:

- Final verdict
- Execution time
- Failed test case (if applicable)

---

# 🧪 Multiple Test Case Support

Every problem may contain multiple hidden or public test cases.

Example:

```text
Input 1
↓

Expected Output 1

↓

Input 2
↓

Expected Output 2

↓

Input 3
↓

Expected Output 3
```

Every test case is evaluated independently.

If any test fails, execution stops immediately and the appropriate verdict is returned.

---

# ⏱ Time Limit Exceeded (TLE)

Each program executes with a configurable timeout.

If execution exceeds the allowed time limit, the worker immediately terminates the process and returns:

```text
Time Limit Exceeded
```

This protects the judge against:

- Infinite loops
- Resource exhaustion
- Malicious submissions

---

# 🐳 Docker Sandbox

Every submission is executed inside its own Docker container.

Current benefits include:

- Filesystem isolation
- Process isolation
- Consistent runtime
- Automatic cleanup
- Secure execution

---

# 🔒 Security

Current security mechanisms:

- Docker isolation
- Temporary execution workspace
- Automatic cleanup
- Execution timeout
- Separate compilation and execution

Planned improvements:

- Memory limits
- CPU limits
- Read-only filesystem
- Network isolation
- Resource quotas

---

# 📊 Supported Verdicts

| Verdict | Description |
|----------|-------------|
| ✅ Accepted | All test cases passed |
| ❌ Wrong Answer | Output differs from expected result |
| ⚠ Compilation Error | Source code failed to compile |
| 💥 Runtime Error | Program crashed during execution |
| ⏱ Time Limit Exceeded | Execution exceeded the allowed time |

---

# 💻 Supported Languages

| Language | Compiler / Interpreter | Status |
|----------|------------------------|--------|
| C++ | g++ | ✅ Supported |
| Python | Python 3 | ✅ Supported |

---

# 🚀 Current Progress

## Completed

- ✅ Docker execution environment
- ✅ BullMQ worker
- ✅ Redis queue integration
- ✅ C++ executor
- ✅ Python executor
- ✅ Multiple test case execution
- ✅ Time Limit Exceeded detection
- ✅ Compilation handling
- ✅ Temporary workspace creation
- ✅ Automatic cleanup
- ✅ Modular project structure

---

## Currently Working On

- Backend API integration
- Submission persistence
- Database integration
- Judge result storage

---

# 🛣 Roadmap

### Planned Features

- JavaScript executor
- Java support
- Go support
- Rust support
- Memory Limit Exceeded (MLE)
- Interactive problems
- Custom checkers
- Distributed judge workers
- Parallel execution
- Live verdict updates
- Judge dashboard
- Performance metrics

---

# 🎯 Design Goals

The project is designed with the following principles:

- Scalability
- Security
- Reliability
- Maintainability
- Extensibility
- Performance

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

Bug reports, feature requests, and suggestions are always appreciated.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Sharyar Naveed**

Software Engineering Student • Backend Developer • System Design Enthusiast

Building **CodeClash** — a scalable online coding platform for competitive programming, technical interviews, and programming education.

---

<p align="center">
Made with ❤️ using Node.js, Docker, Redis, and BullMQ.
</p>