# 🧠 Logic Test
---
## Detailed Explanation

---
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

# 💻 App Development Test

## Detailed Explanation

---

## 📦 Tech Stack

| Layer        | Technology       |
|--------------|------------------|
| **Frontend** | React + TypeScript |
| **Backend**  | Node.js + Express.js |
| **UI Library** | FontAwesome Icons |
| **Styling**  | CSS |

---

## 🚀 Features

### ✅ Frontend

- ✅ Dark Mode Toggle
- ✅ Select All / Multi-user Selection
- ✅ Table display with:
  - Name
  - Balance
  - Email (as clickable button)
  - Registration Date (with hover tooltip)
  - Status button
  - Action buttons (Edit / Delete)
- ✅ Pagination with page controls
- ✅ Sorting (by name, balance, date)
- ✅ Filtering (by keyword)
- ✅ Error handling for fetch failures

### ✅ Backend

- 🛠️ Mockup data generator
- ✅ API with:
  - Pagination
  - Sorting
  - Filtering
- ✅ Express route `/api/users`


---


## 🛠️ Installation & Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/tranhieuphuc12/FEChallenge2025
cd AppDevelopmentTest
```

### 2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

### 3. **Run the Backend**

```bash
node index.js
```

> The backend runs at `http://localhost:8080/api/users`

### 4. **Install Frontend Dependencies**

```bash
cd ../my-app
npm install
```

### 5. **Run the Frontend**

```bash
npm start
```

> The frontend runs at `http://localhost:3000`

---

## 📂 Project Structure

```
AppDevelopmentTest/
│
├── backend/
│   ├── index.js        # Express server
│  
│
├── my-app/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── helpers/
│   │   └── types/
│   └── public/
│
├── README.md
```

---

## 📄 API Endpoint

**`GET /api/users`**

Supports:

- `?page=1`
- `?limit=5`
- `?sortBy=name`
- `?order=asc`
- `?search=John`

---

## 🌐 Backend Details

### 🔧 Mock Data Generation

```ts
const allUsers = Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        balance: Math.floor(i * 10000),
        email: `user${i + 1}@example.com`,
        registeredAt: new Date(),
        active: Math.random() > 0.5,
}));
```


### 📄 Query Parameters

| Param    | Type     | Description                     |
|----------|----------|---------------------------------|
| `page`   | number   | Page number (starting from 1)   |
| `limit`  | number   | Items per page                  |
| `sortBy` | string   | Field to sort (`name`, `balance`, `registeredAt`) |
| `order`  | string   | Sort direction: `asc` or `desc` |

### 🔄 Sorting Logic

```ts
if (sortBy) {
        filteredUsers.sort((a, b) => {
            if (sortBy === 'name') {
                return orderBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }else if (sortBy === 'balance') {
                return orderBy === 'asc' ? a.balance - b.balance : b.balance - a.balance;
            }
            else if (sortBy === 'registeredAt') {
                return orderBy === 'asc' ? new Date(a.registeredAt) - new Date(b.registeredAt) : new Date(b.registeredAt) - new Date(a.registeredAt);
            }
            return 0;
        });
    }
```

---

## 💻 Frontend Details

### 📂 State Variables

```ts
 const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState((false));
  const [users, setUsers] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState('name');
  const [orderBy, setOrderBy] = useState('asc');
```

### 📥 Fetching Users

```ts
useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/api/users?page=${currentPage}&limit=${USERS_PER_PAGE}&sortBy=${sortBy}&orderBy=${orderBy}`);
        if (!response.ok) {
          setError('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalUsers);
        console.log('Users fetched:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, [currentPage, sortBy, orderBy]);
```

---

## 🌒 Dark Mode

```ts
const toggleTheme = () => {
  setIsDarkMode((prev) => !prev);
};
```

```tsx
<div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
```

---

## ❌ Error Handling

```tsx
{error && <p className="error-message">{error}</p>}
```

```ts
catch (err) {
  setError((err as Error).message);
}
```

---

## 🎛️ Sorting and Filtering Controls

```tsx
 <div className="controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="balance">Sort by Balance</option>
            <option value="registeredAt">Sort by Registration Date</option>
          </select>

          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
  </div>
```

---

## 🧪 Sample Screenshot
 - Light mode


## 
---
# Sources
- W3School: https://www.w3schools.com/typescript/typescript_intro.php
- ChatGPT: https://chatgpt.com
- TypeScript: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- React: https://create-react-app.dev/docs/adding-typescript
- MDM Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/AbortController




