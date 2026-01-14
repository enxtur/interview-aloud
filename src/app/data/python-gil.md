---
id: python-gil
title: Python GIL
question: What is the Global Interpreter Lock (GIL) in Python?
tags: [python, concurrency, threading]
difficulty: medium
keywords: [Python, GIL, Global Interpreter Lock, threading, multiprocessing, concurrency]
---
The Global Interpreter Lock (GIL) is a mutex that allows only one thread to execute Python bytecode at a time.
It exists to protect internal Python memory management.
Because of the GIL, CPU-bound multithreaded Python programs do not run in parallel.
I/O-bound tasks can still benefit from multithreading since the GIL is released during I/O operations.
To achieve true parallelism for CPU-bound work, Python uses multiprocessing instead of threading.