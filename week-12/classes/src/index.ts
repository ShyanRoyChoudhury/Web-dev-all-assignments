//classes


/*class DateClass{
    private timeZone: string;
    constructor(timeZone: string){
        this.timeZone = timeZone;
    }

    getTime(){
        var d = new Date();
        console.log('Hi from get-time')
        return d.getTime();
    }

    getMonth(){
        var d = new Date();
        return d.getMonth();
    }

    getTimezone(){
        return this.getTimezone
    }

    expensiveOperation(){
        const startTime = new Date().getTime();
        let ctr = 0;
        for(let i=0; i<100000000; i++){
            ctr++;
        }
        console.log(ctr);
        const endTime = new Date().getTime();

        console.log("total time taken:" + (startTime - endTime));
    }
}

const dateObject = new DateClass("IND");
const response = dateObject.expensiveOperation();
console.log(response);
*/



// Decorators


import { measure } from "helpful-decorators";

class DateClass{
    private timeZone: string;
    constructor(timeZone: string){
        this.timeZone = timeZone;
    }

    @measure
    getTime(){
        var d = new Date();
        console.log('Hi from get-time')
        return d.getTime();
    }

    
}

const dateObject = new DateClass("IND");
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();

