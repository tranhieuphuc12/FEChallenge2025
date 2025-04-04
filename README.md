# 🧠 Logic Test

## Detailed Explanation

## 1. **Delay Function**

```typescript
function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(), ms);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new Error("The operation was aborted"));
      });
    }
    
  });
}
```

### Key Points:
- **Purpose:**  
  The `delay` function returns a promise that resolves after `ms` milliseconds. It also supports cancellation by listening to an `AbortSignal`.

- **Cancellation Support:**  
  If the signal's `abort` event is triggered, the timeout is cleared and the promise is rejected with an error message.

---

## 2. **Processing Function with Delay**

```typescript
async function processWithDelay(numbers: number[], delayMs: number, signal: AbortSignal): Promise<void> {
  
  //Check if input is empty
  if (numbers.length === 0) {
    throw new Error("Array cannot be empty");
   }
  
  //Check if input is an array
  if (!Array.isArray(numbers)) {
    throw new Error("Input must be an array");
   }

  //Check if input is an array of numbers
  if (!numbers.every(num => typeof num === 'number')) {
    throw new Error("Array must contain only numbers");
  }


  for (let i = 0; i < numbers.length; i++) {

    //Check if the abort signal is triggered
    if (signal.aborted) {
      console.log("The operation was aborted");
      return;
    }

    // Process the number
    console.log(`Processing number: ${numbers[i]}`);
    
    // Simulate processing time
    // If the signal is aborted, the delay will be interrupted
    try {
      await delay(delayMs, signal);
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

```

### Key Points:
- **Input Validation:**
  Checks that the input is a non-empty array and ensures all items in the array are numbers.
- **Asynchronous Function:**  
  The `processWithDelay` function is asynchronous, meaning it can pause execution using `await` for asynchronous operations.
  
- **Iteration & Printing:**  
  A `for` loop iterates over the `numbers` array. Each number is printed using `console.log()`.
  
- **Delay with Cancellation:**  
  The function awaits the `delay` helper function which includes the cancellation logic. If the delay is aborted, the error is caught, logged, and the process stops.

- **Abort Check:**  
  Before printing each number, the function checks if the `signal` has already been aborted.

---

## 3. **Example Usage**

```typescript
const numbers = [1, 2, 3, 4, 5];
const delayMs = 1000; 
const controller = new AbortController();
const signal = controller.signal;


processWithDelay(numbers, delayMs, signal);

// Simulate aborting the operation after 3 seconds
setTimeout(() => {
  console.log("Aborting the operation...");
  controller.abort();
}
, 3000);
```

### Key Points:
- **AbortController:**  
  An instance of `AbortController` is created to manage cancellation. Its `signal` is passed into the function.
  
- **Cancellation Example:**  
  A `setTimeout` is used to call `controller.abort()` after 3 seconds, demonstrating how the process can be cancelled before all numbers are printed.

---

This approach gives you a flexible and robust way to print array elements with a delay, while allowing for progress tracking and the ability to cancel the operation when needed.

# How to Run a TypeScript File

## 1. Install TypeScript (If Not Installed)
Run the following command to install TypeScript globally:
```sh
npm install -g typescript
```
Verify the installation:
```sh
tsc -v
```

## 2. Compile and Run the TypeScript File
If your TypeScript file (e.g., `index.ts`) uses `setTimeout`, `Promise`, or `console.log()`, compile it with the correct library support using:
```sh
tsc index.ts --lib es2015,dom
```
This ensures that TypeScript recognizes modern JavaScript features (`es2015`) and browser/Node.js global objects (`dom`).

## 3. Run the Compiled JavaScript File
After compilation, run the generated JavaScript file with:
```sh
node index.js
```

## Alternative: Run TypeScript Without Compilation
Instead of compiling first, you can run TypeScript directly using `ts-node`:
```sh
npx ts-node index.ts
```
# Sources
- W3School: https://www.w3schools.com/typescript/typescript_intro.php
- ChatGPT: https://chatgpt.com
- TypeScript: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- React: https://create-react-app.dev/docs/adding-typescript
- MDM Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/AbortController




