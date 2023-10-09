"use strict";
//classes
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const helpful_decorators_1 = require("helpful-decorators");
class DateClass {
    constructor(timeZone) {
        this.timeZone = timeZone;
    }
    getTime() {
        var d = new Date();
        console.log('Hi from get-time');
        return d.getTime();
    }
}
__decorate([
    helpful_decorators_1.measure
], DateClass.prototype, "getTime", null);
const dateObject = new DateClass("IND");
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();
dateObject.getTime();
