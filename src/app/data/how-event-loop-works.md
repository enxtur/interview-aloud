---
id: how-event-loop-works
title: How the Node.js Event Loop Works
question: How does the Node.js event loop work?
tags: [nodejs, javascript, concurrency]
difficulty: medium
keywords: [Node.js, Event Loop, Call Stack, Async, Microtasks, libuv]
---
The Node.js event loop allows JavaScript to run asynchronously on a single thread.
Synchronous code runs on the call stack.
Asynchronous operations are offloaded to the OS or libuv thread pool.
Completed async tasks place callbacks into queues.
The event loop processes these queues in defined phases.
Microtasks like Promises and process.nextTick run with higher priority.