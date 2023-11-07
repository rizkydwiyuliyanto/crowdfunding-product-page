let a = "321,222";
let pattern = /\d+/g;
let setNominal = Number(a.match(pattern).join(""));
let b = Number(a);

console.log(setNominal)