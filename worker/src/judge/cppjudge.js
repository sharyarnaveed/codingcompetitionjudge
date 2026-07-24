const path = require("path");

const dockerRunner = require("../docker/dockerrunner");
const readFile = require("../utils/readfile");
const compareOutput = require("./compareoutput");
const getVerdict = require("./verdict");

async function cppJudge(workspace) {
    // -----------------------------
    // Step 1: Compile
    // -----------------------------
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

    // -----------------------------
    // Step 2: Execute
    // -----------------------------
    const executionResult = await dockerRunner(
        "judge-cpp",
        workspace,
        [
            "bash",
            "-c",
            `
            set -e
            ./main < input.txt
            `
        ]
    );

    if (executionResult.exitCode !== 0) {
        return {
            verdict: "RUNTIME_ERROR",
            stdout: executionResult.stdout,
            stderr: executionResult.stderr
        };
    }

    // -----------------------------
    // Step 3: Read Expected Output
    // -----------------------------
    const expected = await readFile(
        path.join(workspace, "expected.txt")
    );

    // -----------------------------
    // Step 4: Compare Output
    // -----------------------------
    const isCorrect = compareOutput(
        executionResult.stdout,
        expected
    );

    // -----------------------------
    // Step 5: Return Verdict
    // -----------------------------
    return getVerdict(
        executionResult,
        isCorrect,
        expected
    );
}

module.exports = cppJudge;