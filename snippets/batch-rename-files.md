---
title: Batch rename files using rename
tags: snippet
layout: subs/layout-note.njk
---

This appends .json to each file that doesn't already have a .json extension.

```commandline
rename 's/$/.json/' *
```