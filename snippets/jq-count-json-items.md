---
title: Count items in JSON file using jq
tags: snippet
layout: subs/layout-snippet.njk
---

```console
jq -s '. | length' sample_data.json
```
