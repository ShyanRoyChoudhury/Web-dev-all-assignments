"use strict";
function getFirstElement(arr) {
    return arr[0];
}
let ans1 = getFirstElement([1, 2, 3, 4]);
let ans2 = getFirstElement(['ONE', 'two', 'three']);
let ans3 = getFirstElement([{
        name: "shyan",
        age: 23
    }, {
        name: "Urja",
        age: 18
    }]);
//ans2 = ans2.toLowerCase();
console.log(ans3);
