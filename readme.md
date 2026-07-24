# 🚀 CodeClash Judge

<p align="center">
  <h3 align="center">A Secure, Scalable & Docker-Based Online Code Judge</h3>

  <p align="center">
    CodeClash Judge is an online code execution engine that securely compiles,
    executes, and evaluates programming submissions inside isolated Docker
    containers with support for multiple test cases and detailed verdicts.
  </p>
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![Redis](https://img.shields.io/badge/Redis-Queue-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-Worker-orange?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Sandbox-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Development-yellow?style=for-the-badge)

</p>

---

# 📖 Overview

**CodeClash Judge** is the execution engine powering the **CodeClash** online programming platform.

It securely compiles and executes user submissions inside isolated Docker containers, evaluates them against multiple test cases, and returns accurate verdicts.

The project follows a scalable architecture where the API, queue, and workers are separated, making it easy to scale horizontally as the platform grows.

---

# ✨ Features

- 🐳 Docker-based sandbox execution
- ⚡ Queue-driven judging architecture
- 🧪 Multiple test case support
- ⏱ Time Limit Exceeded (TLE)
- 📊 Detailed execution verdicts
- 🔒 Secure isolated execution
- 📁 Temporary workspace generation
- 🧹 Automatic execution management
- 🏗 Modular executor architecture
- 🚀 Scalable worker design

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

---

# 💻 Supported Languages

| Language | Status |
|----------|--------|
| C++ | ✅ Supported |
| Python | ✅ Supported |

---

# 🏗 Architecture

```text
                     User
                       │
                       ▼
                Express Backend
                       │
                 Create Submission
                       │
                       ▼
                  BullMQ Queue
                       │
                    Redis
                       │
                       ▼
                Judge Worker
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
     C++ Executor            Python Executor
          │                         │
          └────────────┬────────────┘
                       ▼
                Docker Container
                       │
                       ▼
              Execute Test Cases
                       │
                       ▼
                Generate Verdict
                       │
                       ▼
                Return Response
```

---

# ⚙️ Judging Workflow

## 1. Submission

The backend receives

- Source Code
- Programming Language
- Problem ID

↓

## 2. Queue

The submission is pushed into the BullMQ queue.

↓

## 3. Worker

A dedicated worker picks the submission from Redis.

↓

## 4. Executor

The appropriate executor is selected.

Current executors

- C++
- Python

↓

## 5. Docker

Source code is compiled (if required) and executed inside a Docker container.

↓

## 6. Test Cases

Each test case runs independently.

↓

## 7. Verdict

A final verdict is generated and returned.

---

# 🧪 Multiple Test Cases

Each problem can contain any number of test cases.

Example

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

Execution stops immediately if any test case fails.

---

# ⏱ Time Limit Exceeded (TLE)

Every execution has a configurable timeout.

If a program exceeds the allowed execution time, the worker terminates the process and returns

```text
Time Limit Exceeded
```

This prevents

- Infinite loops
- Resource abuse
- Long-running processes

---

# 📊 Supported Verdicts

| Verdict | Description |
|----------|-------------|
| ✅ Accepted | All test cases passed |
| ❌ Wrong Answer | Output does not match expected output |
| ⚠️ Compilation Error | Source code failed to compile |
| 💥 Runtime Error | Program crashed during execution |
| ⏱ Time Limit Exceeded | Program exceeded execution limit |

---

# 🔒 Security

Current security features

- Docker container isolation
- Separate compilation & execution
- Temporary execution directories
- Process timeout protection
- Secure execution environment

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
│   ├── utils/
│   │
│   └── temp/
│
├── docker/
│
├── package.json
│
└── README.md
```

---

# 🚀 Current Progress

## ✅ Completed

- ✅ Docker-based sandbox execution
- ✅ BullMQ Worker
- ✅ Redis queue integration
- ✅ C++ Judge
- ✅ Python Judge
- ✅ Multiple Test Cases
- ✅ Compilation handling
- ✅ Runtime Error detection
- ✅ Time Limit Exceeded (TLE)
- ✅ Modular executor architecture
- ✅ Temporary workspace generation

---

## 🚧 Upcoming Features

- ⬜ Memory Limit Exceeded (MLE)
- ⬜ Output Limit Exceeded (OLE)
- ⬜ Automatic Workspace Cleanup
- ⬜ PostgreSQL Integration
- ⬜ Hidden Test Cases
- ⬜ Submission Persistence
- ⬜ Result Persistence
- ⬜ Backend API Integration

---

# 🛣 Development Roadmap

## Phase 1 — Core Judge ✅

- ✅ Docker Sandbox
- ✅ BullMQ Worker
- ✅ C++ Executor
- ✅ Python Executor
- ✅ Multiple Test Cases
- ✅ Time Limit Exceeded

---

## Phase 2 — Judge Enhancements 🚧

- ⬜ Memory Limit Exceeded
- ⬜ Output Limit Exceeded
- ⬜ Hidden Test Cases
- ⬜ Automatic Workspace Cleanup
- ⬜ Better Runtime Statistics
- ⬜ Memory Usage Reporting

---

## Phase 3 — Backend

- ⬜ PostgreSQL Integration
- ⬜ Submission Storage
- ⬜ Result Storage
- ⬜ REST API
- ⬜ Authentication
- ⬜ Problem Management

---

## Phase 4 — Scaling

- ⬜ JavaScript Executor
- ⬜ Java Executor
- ⬜ Go Executor
- ⬜ Rust Executor
- ⬜ Multiple Judge Workers
- ⬜ Distributed Judge Cluster
- ⬜ Live Verdict Updates
- ⬜ Judge Dashboard
- ⬜ Performance Monitoring

---

# 🎯 Design Goals

The primary goals of CodeClash Judge are

- Scalability
- Security
- Reliability
- Performance
- Maintainability
- Extensibility

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to contribute:

```bash
# Fork the repository

# Create a new branch
git checkout -b feature/my-feature

# Commit changes
git commit -m "Add new feature"

# Push branch
git push origin feature/my-feature
```

Then open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Sharyar Naveed**

Software Engineering Student • Backend Developer • System Design Enthusiast

Building **CodeClash**, a modern online programming platform focused on competitive programming, technical interviews, and programming education.

---

<p align="center">
Built with ❤️ using Node.js, Docker, Redis, BullMQ & Express.js
</p>