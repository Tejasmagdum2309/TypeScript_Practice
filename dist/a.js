"use strict";
let nameI = "sdd";
let userArr = [
    { name: "sdd", age: 19 },
    { name: "sdd", age: 12 },
    { name: "sdd", age: 43 },
];
let ans = userArr.reduce((acc, user) => {
    if (user.age > 18) {
        acc.push(user.name);
    }
    return acc;
}, []);
console.log(ans);
