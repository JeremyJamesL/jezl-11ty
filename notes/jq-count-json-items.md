---
title: Count items in JSON file using jq
tags: note
layout: subs/layout-note.njk
---

```console
jq -s '. | length' sample_data.json
```
