---
id: idempotency
title: Idempotency
question: What is idempotency in APIs?
tags: [api, reliability]
difficulty: medium
keywords: [Idempotency, API, Reliability, Side Effects, Distributed Systems]
---
An operation is idempotent if it produces the same result when repeated.
GET, PUT, and DELETE requests are typically idempotent.
POST requests are usually not idempotent.
Idempotency helps prevent unintended side effects.
It is especially important in distributed systems.

