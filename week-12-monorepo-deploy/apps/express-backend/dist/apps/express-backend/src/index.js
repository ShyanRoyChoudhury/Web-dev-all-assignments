"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3002;
const common_1 = require("common");
app.use(express.json());
app.get('/', (req, res) => {
    let parsedUser = common_1.UserInput.safeParse(req.body);
    if (!parsedUser) {
        res.send('Incorrect input');
        return;
    }
    else {
        res.send('correct input');
    }
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
