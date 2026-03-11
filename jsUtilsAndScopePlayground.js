// ============================================================
// Part A: JavaScript Utilities Library
// ============================================================

// -- Function Declaration --
function doubleNumber(num) {
  return num * 2;
}

console.log("--- doubleNumber ---");
console.log(doubleNumber(5)); // 10
console.log(doubleNumber(-4)); // -8

// -- Function Expression --
const capitalizeWord = function (word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
};

console.log("\n--- capitalizeWord ---");
console.log(capitalizeWord("hello")); // Hello
console.log(capitalizeWord("javascript")); // Javascript

// -- Arrow Function --
const isPalindrome = (str) => {
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
};

console.log("\n--- isPalindrome ---");
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("Race Car")); // true

const sumArray = (arr) => arr.reduce((total, num) => total + num, 0);

console.log("\n--- sumArray ---");
console.log(sumArray([1, 2, 3, 4, 5])); // 15
console.log(sumArray([])); // 0

const isEvenOrOdd = (num) => (num % 2 === 0 ? "Even" : "Odd");

console.log("\n--- isEvenOrOdd ---");
console.log(isEvenOrOdd(4)); // Even
console.log(isEvenOrOdd(7)); // Odd

function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log("\n--- reverseString ---");
console.log(reverseString("hello")); // olleh
console.log(reverseString("JavaScript")); // tpircSavaJ

// ============================================================
// Part B: Scope Simulation
// ============================================================

// Global variable — accessible everywhere
let globalMessage = "I am global!";

console.log("\n--- Scope Simulation ---");
console.log("Outside:", globalMessage);

function scopeDemo() {
  // var is function-scoped
  var functionScoped = "I am var";

  // global is readable and writable inside a function
  console.log("Inside function:", globalMessage); // ✅ global scope — visible everywhere
  globalMessage = "Changed inside function!";

  if (true) {
    // let and const are block-scoped — only live inside this if-block
    let blockLet = "I am let";
    const blockConst = "I am const";

    console.log("Inside block - let:", blockLet); // ✅ we're inside the block where it was declared
    console.log("Inside block - const:", blockConst); // ✅ same reason
    console.log("Inside block - var:", functionScoped); // ✅ var leaks out of blocks — visible across whole function

    // Nested function can access all variables above via scope chain
    function nestedFunction() {
      console.log("Nested - global:", globalMessage); // ✅ global is always visible
      console.log("Nested - var:", functionScoped); // ✅ var is function-scoped, nested function is inside that function
      console.log("Nested - let:", blockLet); // ✅ nested function is defined inside the block
      console.log("Nested - const:", blockConst); // ✅ same reason
    }

    nestedFunction();
  }

  // let and const are gone here — would throw ReferenceError:
  // console.log(blockLet);   // ❌ out of block scope
  // console.log(blockConst); // ❌ out of block scope

  // var is still alive — function scope, not block scope
  console.log("After block - var:", functionScoped); // ✅ var ignores block boundaries
}

scopeDemo();

// Global was modified inside scopeDemo — change is reflected here
console.log("Outside after function ran:", globalMessage);

// functionScoped is gone here — would throw ReferenceError:
// console.log(functionScoped); // ❌ ReferenceError

// ============================================================
// Part C: Hoisting & Temporal Dead Zone (TDZ)
// ============================================================

console.log("\n--- Hoisting & TDZ ---");

// var is hoisted — only the declaration moves to top, not the value
console.log("\n[var] before declaration:", varHoisted); // undefined — declared but not yet assigned
var varHoisted = "I am var";
console.log("[var] after declaration:", varHoisted); // value is now assigned

// let is in TDZ before its declaration — accessing it throws ReferenceError
try {
  console.log(letHoisted); // ❌ TDZ — let exists but is not initialized yet
} catch (e) {
  console.log("[let] before declaration — ReferenceError:", e.message);
}
let letHoisted = "I am let";
console.log("[let] after declaration:", letHoisted); // safe to access now

// const behaves the same as let — TDZ throws ReferenceError before declaration
try {
  console.log(constHoisted); // ❌ TDZ — same rule as let
} catch (e) {
  console.log("[const] before declaration — ReferenceError:", e.message);
}
const constHoisted = "I am const";
console.log("[const] after declaration:", constHoisted); // safe to access now

// Function declarations are fully hoisted — both name and body
console.log("\n[function declaration] before definition:", hoistedFn()); // works — entire function is hoisted

function hoistedFn() {
  return "Fully hoisted!";
}

// Function expressions are not hoisted — const keeps it in TDZ
try {
  console.log(notHoistedFn()); // ❌ TDZ — const is not initialized yet
} catch (e) {
  console.log(
    "[function expression] before definition — ReferenceError:",
    e.message,
  );
}

const notHoistedFn = () => "Not hoisted!";
console.log("[function expression] after definition:", notHoistedFn()); // works — defined above this line
