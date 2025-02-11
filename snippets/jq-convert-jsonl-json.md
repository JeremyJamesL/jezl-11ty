---
title: Convert JSONL to JSON using JQ
tags: snippet
layout: subs/layout-snippet.njk
---

```console
jq -s '.' input.jsonl > output.json
```

And the other way:

```console
jq -c '.[]' input.json > output.jsonl
```
