const createWorkspace = require("./createworkspace");
const saveCode = require("./savecode");

const cppJudge = require("../judge/cppjudge");
const cleanupWorkspace = require("./cleanupworkspace");

(async () => {

    const job = await createWorkspace();

    const code = `
#include <iostream>

int main() {
    while (true) {
        std::cout << "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
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

    try {
        const verdict = await cppJudge(
            job.workspace,
            testcases
        );
    
        console.log(verdict);
    } catch (error) {
        console.log(error)
    }
    finally{
        await cleanupWorkspace(job.workspace)
    }
    

})();