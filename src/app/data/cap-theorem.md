---
id: cap-theorem
title: CAP Theorem
question: What is the CAP theorem?
tags: [distributed-systems, databases, consistency, availability]
difficulty: medium
keywords: [CAP, Consistency, Availability, Partition Tolerance, Distributed Systems]
---
Consistency, Availability, and Partition Tolerance are the three parts of the CAP theorem.
The CAP theorem says a distributed system can guarantee only two of these three.
Consistency means all nodes return the same data.
Availability means every request gets a response.
Partition tolerance means the system continues despite network failures.
During a partition, the system must choose consistency or availability.
Most real systems keep partition tolerance and trade off the other two.
