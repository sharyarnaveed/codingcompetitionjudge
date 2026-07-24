const createWorkspace = require("./createworkspace");
const saveCode = require("./savecode");

const cppJudge = require("../judge/cppjudge");

(async () => {

    const job = await createWorkspace();

    const code = `
#include<iostream>
using namespace std;

int main() {
    int a,b;
    cin >> a >> b;
    cout << a + b;
}
`;

    await saveCode(job.workspace, "cpp", code);

    const testcases = [
        {
            input: "/home/spcai/Desktop/codeclash/worker/tests/input1.txt",
            output: "/home/spcai/Desktop/codeclash/worker/tests/output1.txt"
        },
        {
            input: "/home/spcai/Desktop/codeclash/worker/tests/input2.txt",
            output: "/home/spcai/Desktop/codeclash/worker/tests/output2.txt"
        }
    ];

    const verdict = await cppJudge(
        job.workspace,
        testcases
    );

    console.log(verdict);

})();