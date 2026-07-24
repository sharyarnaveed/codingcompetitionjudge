
const fs = require("fs/promises");
const path = require("path");

async function savecode(workspace,language,code){
    let filename
    switch (language){
        case "cpp":
            filename="main.cpp"
            break
            case "python":
            filename = "main.py";
            break;

        default:
            throw new Error("Unsupported language");
    }
    const filepath=path.join(workspace,filename)
    await fs.writeFile(filepath,code,"utf8")
    return filepath
}

module.exports=savecode