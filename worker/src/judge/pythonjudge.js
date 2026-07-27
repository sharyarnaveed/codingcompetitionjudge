const fs = require("fs/promises");
const path = require("path");

const dockerRunner = require("../docker/dockerrunner");
const readFile = require("../utils/readfile");
const compareOutput = require("./compareoutput");

const OUTPUT_LIMIT = 1024 * 1024; // 1 MB

async function pythonJudge(workspace, testcases) {

    for (let i = 0; i < testcases.length; i++) {

        const testcase = testcases[i];

        // Copy testcase input
        await fs.copyFile(
            testcase.input,
            path.join(workspace, "input.txt")
        );

        // Remove previous output files
        await fs.rm(
            path.join(workspace, "output.txt"),
            { force: true }
        );

        await fs.rm(
            path.join(workspace, "error.txt"),
            { force: true }
        );

        // Execute Python
        const executionResult = await dockerRunner(
            "judge-python",
            workspace,
            [
                "bash",
                "-c",
                `
                set -e
                timeout 2s python3 main.py < input.txt > output.txt 2> error.txt
                `
            ]
        );

        // -------------------------
        // Time Limit Exceeded
        // -------------------------
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
        const stats = await fs.stat(
            path.join(workspace, "output.txt")
        );

        if (stats.size > OUTPUT_LIMIT) {
            return {
                verdict: "OUTPUT_LIMIT_EXCEEDED",
                testCase: i + 1
            };
        }

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

    return {
        verdict: "ACCEPTED"
    };
}

module.exports = pythonJudge;