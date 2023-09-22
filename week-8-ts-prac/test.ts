function swap<T>(a: T,b: T): [T, T]{
    return [b, a];
}

let ans = swap<string>("urja", "shyan");



function swap2<T, U>(a:T, b:U): [U, T]{
    return [b,a];
}

const ans5 = swap2("Shyan", 23);
console.log(ans5);