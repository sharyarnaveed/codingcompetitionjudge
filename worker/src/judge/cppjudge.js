const fs = require("fs/promises");
const path = require("path");

const dockerRunner = require("../docker/dockerrunner");
const readFile = require("../utils/readfile");
const compareOutput = require("./compareoutput");

const OUTPUT_LIMIT = 1024 * 1024; // 1 MB

async function cppJudge(workspace, testcases) {

    // -------------------------
    // Compile once
    // -------------------------
    const compileResult = await dockerRunner(
        "judge-cpp",
        workspace,
        [
            "bash",
            "-c",
            `
            set -e
            g++ main.cpp -o main
            `
        ]
    );

    if (compileResult.exitCode !== 0) {
        return {
            verdict: "COMPILATION_ERROR",
            stderr: compileResult.stderr
        };
    }

    // -------------------------
    // Run all test cases
    // -------------------------
    for (let i = 0; i < testcases.length; i++) {

        const testcase = testcases[i];

        // Copy input
        await fs.copyFile(
            testcase.input,
            path.join(workspace, "input.txt")
        );

        // Remove previous outputs if they exist
        await fs.rm(path.join(workspace, "output.txt"), {
            force: true
        });

        await fs.rm(path.join(workspace, "error.txt"), {
            force: true
        });

        // Execute
        const executionResult = await dockerRunner(
            "judge-cpp",
            workspace,
            [
                "bash",
                "-c",
                `
                set -e
                timeout 2s ./main < input.txt > output.txt 2> error.txt
                `
            ]
        );

        // -------------------------
        // Time Limit Exceeded
        // -------------------------
        console.log(executionResult)
           const stats = await fs.stat(
            path.join(workspace, "output.txt")
        );

        if (stats.size > OUTPUT_LIMIT) {
            return {
                verdict: "OUTPUT_LIMIT_EXCEEDED",
                testCase: i + 1
            };
        }
        
        if (executionResult.exitCode === 124) {
            return {
                verdict: "TIME_LIMIT_EXCEEDED",
                testCase: i + 1
            };
        }

        // -------------------------
        // Memory Limit Exceeded
        // -------------------------
        if (executionResult.exitCode === 137) {
            return {
                verdict: "MEMORY_LIMIT_EXCEEDED",
                testCase: i + 1
            };
        }

        // -------------------------
        // Runtime Error
        // -------------------------
        if (executionResult.exitCode !== 0) {

            let stderr = "";

            try {
                stderr = await readFile(
                    path.join(workspace, "error.txt")
                );
            } catch {}

            return {
                verdict: "RUNTIME_ERROR",
                testCase: i + 1,
                stderr
            };
        }

        // -------------------------
        // Output Limit Exceeded
        // -------------------------
     

        // -------------------------
        // Compare Output
        // -------------------------
        const actual = await readFile(
            path.join(workspace, "output.txt")
        );

        const expected = await readFile(
            testcase.output
        );

        const accepted = compareOutput(actual, expected);

        if (!accepted) {
            return {
                verdict: "WRONG_ANSWER",
                testCase: i + 1,
                actual,
                expected
            };
        }
    }

    // -------------------------
    // Accepted
    // -------------------------
    return {
        verdict: "ACCEPTED"
    };
}

module.exports = cppJudge;