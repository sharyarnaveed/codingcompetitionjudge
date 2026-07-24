const {spawn}=require("child_process")
const uid = process.getuid();
const gid = process.getgid();
function dockerRunner(image, workspace, command)
{
    return new Promise((resolve,reject)=>{
       
const docker = spawn("docker", [
    "run",
    "--rm",

    "--user",
    `${uid}:${gid}`,

    "-v",
    `${workspace}:/code`,

    image,

    ...command
]);
         let stdout = "";
        let stderr = "";

        docker.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        docker.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        docker.on("close", (code) => {
            resolve({
                exitCode: code,
                stdout,
                stderr,
            });
        });

        docker.on("error", reject);
    })
}

module.exports = dockerRunner;