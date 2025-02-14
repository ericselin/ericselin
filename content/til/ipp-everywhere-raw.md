---
title: It's best to use "raw" manufacturer for printers
date: 2025-02-14
---

Printing in Linux is kind of a mess (personal opinion). In addition to discovery
and connection problems with mDNS and such, it is actually hard to get IPP
Everywhere to work. Even though it's supposed to "just work"!

Today I learned that one should use the "raw" manufacturer when adding a network
printer. (I have previously learned that it should be added by using its IP
address.)

Why CUPS insists on asking about make and model for IPP Everywhere is strange to
me. It seems like totally not the point of IPP Everywhere...
