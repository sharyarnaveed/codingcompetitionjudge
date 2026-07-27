
const express = require("express");

const app = express();

app.use(express.json());

app.post("/judge",(req,res)=>{
    const { language, code, testcases } = req.body;

    console.log(language);
    console.log(code);
    console.log(testcases);

    return res.json({
        success: true,
        message: "Judge request received."
    });
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});