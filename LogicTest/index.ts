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
