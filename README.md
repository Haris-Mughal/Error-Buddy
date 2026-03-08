# Error Buddy - ExplainMyError

**ExplainMyError** is a developer tool that translates confusing programming errors into clear, human-readable explanations.

Instead of spending hours searching forums or documentation, developers can paste an error message and instantly understand:

- what the error means  
- why it occurred  
- how to fix it  
- what the corrected code looks like  

The goal is simple: **make debugging faster and learning easier.**

---

## ✨ Features

- **Instant Error Explanation**  
  Understand complex error messages in simple language.

- **Root Cause Detection**  
  See why the error happened instead of just the error text.

- **Step-by-Step Fix Guidance**  
  Get clear instructions on how to resolve the issue.

- **Corrected Code Output**  
  Receive a working example showing the fix.

- **Beginner Mode**  
  Explains concepts using simple wording and analogies.

- **Example Error Library**  
  Quickly test common errors with prefilled examples.

- **Developer Friendly UI**  
  Clean dark interface with syntax-highlighted code blocks.

---

## 🧠 How It Works

1. Enter the **programming language**.
2. Paste the **error message**.
3. Optionally add the **code snippet** that caused the error.
4. Click **Analyze Error**.

The system analyzes the error and returns:

- Explanation  
- Root cause  
- Suggested fix  
- Example corrected code  

---

## 🖥️ Example

**Input**

```
Error:
TypeError: Cannot read property 'map' of undefined
```

**Output**

```
Explanation:
You attempted to call .map() on a variable that is undefined.

Why it happens:
The variable expected to hold an array was never initialized or
the data had not loaded yet.

Fix:
Ensure the variable exists before calling .map().

Example:
users?.map(user => ...)
```

---

## 🧰 Tech Stack

- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **AI Processing:** Large Language Model API  
- **Syntax Highlighting:** Code block rendering for readable outputs  

---

## 🚀 Getting Started

Clone the repository:

```
git clone https://github.com/your-username/explain-my-error.git
```

Navigate to the project folder:

```
cd explain-my-error
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

---

## 🎯 Project Goal

Developers—especially beginners—often struggle with unclear error messages.  
ExplainMyError focuses on **bridging the gap between error output and understanding**, helping developers debug faster and learn along the way.

---

## 🤝 Contributing

Contributions, improvements, and suggestions are welcome.  
Feel free to open issues or submit pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful, consider giving the repository a **star**.

> ~Muhammad Haris Ahsan
