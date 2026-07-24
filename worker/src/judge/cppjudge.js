const fs = require("fs/promises");
const path = require("path");

const dockerRunner = require("../docker/dockerrunner");
const readFile = require("../utils/readfile");
const compareOutput = require("./compareoutput");
const getVerdict = require("./verdict");

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
            stdout: "",
            stderr: compileResult.stderr
        };
    }

    // -------------------------
    // Run all test cases
    // -------------------------
    for (let i = 0; i < testcases.length; i++) {

        const testcase = testcases[i];

        // Copy current testcase input into workspace/input.txt
        await fs.copyFile(
            testcase.input,
            path.join(workspace, "input.txt")
        );

        // Execute program
        const executionResult = await dockerRunner(
            "judge-cpp",
            workspace,
            [
                "bash",
                "-c",
                `
                set -e
             timeout 2s ./main < input.txt
                `
            ]
        );
if (executionResult.exitCode === 124) {
    return {
        verdict: "TIME_LIMIT_EXCEEDED",
        testCase: i + 1
    };
}
        // Runtime Error
        if (executionResult.exitCode !== 0) {
            return {
                verdict: "RUNTIME_ERROR",
                testCase: i + 1,
                stdout: executionResult.stdout,
                stderr: executionResult.stderr
            };
        }

        if (executionResult.exitCode === 124) {
    return {
        verdict: "TIME_LIMIT_EXCEEDED",
        testCase: i + 1
    };
}

        // Read expected output
        const expected = await readFile(testcase.output);

        // Compare output
        const accepted = compareOutput(
            executionResult.stdout,
            expected
        );

        if (!accepted) {
            return {
                verdict: "WRONG_ANSWER",
                testCase: i + 1,
                stdout: executionResult.stdout,
                stderr: executionResult.stderr,
                expected
            };
        }
    }

    // -------------------------
    // All test cases passed
    // -------------------------
    return {
        verdict: "ACCEPTED"
    };
}

module.exports = cppJudge;