const path = require("path");

const dockerRunner = require("../docker/dockerrunner");
const readFile = require("../utils/readfile");
const compareOutput = require("./compareoutput");
const getVerdict = require("./verdict");

async function pythonJudge(workspace) {

    // -----------------------------
    // Execute Python
    // -----------------------------
    const executionResult = await dockerRunner(
        "judge-python",
        workspace,
        [
            "bash",
            "-c",
            `
            set -e
           timeout 2s python3 main.py < input.txt
            `
        ]
    );
if (executionResult.exitCode === 124) {
    return {
        verdict: "TIME_LIMIT_EXCEEDED",
        testCase: i + 1
    };
}
    // -----------------------------
    // Runtime Error
    // -----------------------------
    if (executionResult.exitCode !== 0) {
        return {
            verdict: "RUNTIME_ERROR",
            stdout: executionResult.stdout,
            stderr: executionResult.stderr
        };
    }

    // -----------------------------
    // Read Expected Output
    // -----------------------------
    const expected = await readFile(
        path.join(workspace, "expected.txt")
    );

    // -----------------------------
    // Compare Output
    // -----------------------------
    const isCorrect = compareOutput(
        executionResult.stdout,
        expected
    );

    // -----------------------------
    // Final Verdict
    // -----------------------------
    return getVerdict(
        executionResult,
        isCorrect,
        expected
    );
}

module.exports = pythonJudge;