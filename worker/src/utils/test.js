const createWorkspace = require("./createworkspace");
const saveCode = require("./savecode");
const saveInput = require("./saveinput");
const saveExpectedOutput = require("./saveexpectedoutput");

const cppJudge = require("../judge/cppjudge");
const pythonJudge = require("../judge/pythonjudge");

(async () => {

    const job = await createWorkspace();

    const code = `
a, b = map(int, input().split())
print(a + b)
`;

    await saveCode(
        job.workspace,
        "python",
        code
    );

    await saveInput(
        job.workspace,
        "10 20"
    );

    await saveExpectedOutput(
        job.workspace,
        "40"
    );

    const verdict = await pythonJudge(job.workspace);

    console.log(verdict);

})();