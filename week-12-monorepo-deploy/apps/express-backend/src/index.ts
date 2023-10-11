const express = require('express');
const app = express();
const port = 3002;
import { UserInput } from 'common';

app.use(express.json());

app.get('/', (req: any, res: any)=>{
    let parsedUser = UserInput.safeParse(req.body);
    if(!parsedUser){
        res.send('Incorrect input');
        return;
    }else{
        res.send('correct input');
    }
});

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});