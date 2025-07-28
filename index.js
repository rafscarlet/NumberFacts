import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    let chosen = 0;
    let type = (req.body.factType === "any")? '' : req.body.factType;
    let fact = '';
    let number = '';

    console.log(type);

    if (!!req.body.randomNum) {
        chosen = `random/${type}`;

    } else {
        chosen = renderType(type, req.body.num);
    }

    // console.log(chosen);

    if (chosen != "NaN" && chosen !="NaD") {
        const result = await axios.get(`http://numbersapi.com/${chosen}`);

        fact = formatMath(result.data.trim());
        number = getNum(fact, type)

    } else {
        fact = "An error occured. Check if your inputs are valid and try again..."
        number = "...."
        if (chosen === "NaD"){
            fact+= "<br> Error: Not a Date!"
        }
    }

    res.render("index.ejs", { fact, number });
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});



function renderType(type, num) {

    switch (type) {
        case "date":
            let str = num.toString().trim();
            let month = str.split("/")[1];
            let day = str.split("/")[0];

            if (month === '' || day === '' || isNaN(month) || isNaN(day)) {
                return "NaN"
            } else if (Number(month) > 12 || Number(day) > 31) {
                return "NaD"
            } else {
                let formatted = month + "/" + day;
                return `${formatted}/${type}`;
            }

        default:
            if (num === '' || isNaN(num)) {
                return "NaN"
            } else {
                return `${num}/${type}`;
            }
    }
};


function formatMath(text) {
    return text.replace(/(\w+_\{[^}]+\}|\w+\^\{[^}]+\}|\bf\(.*?\))/g, '\\($1\\)');
};


function getNum(text, type) {

    if (type === "date") {
        const str = text.split(" ")[0] + " " + text.split(" ")[1];
        return str
    } else {
        const str = text.split(" ")[0];
        // const onlyNum = str.replace(/\D/g, "");
        return str;
    }
};