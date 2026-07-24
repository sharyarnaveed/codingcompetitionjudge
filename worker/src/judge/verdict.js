function getVerdict(result, isCorrect,expected) {

    if (result.exitCode !== 0) {
        return {
            verdict: "RUNTIME_ERROR",
            stdout: result.stdout,
            stderr: result.stderr
        };
    }

    if (!isCorrect) {
        return {
            verdict: "WRONG_ANSWER",
            stdout: result.stdout,
            stderr: result.stderr,
            expected
        };
    }

    return {
        verdict: "ACCEPTED",
        stdout: result.stdout,
        stderr: result.stderr
    };
}

module.exports = getVerdict;