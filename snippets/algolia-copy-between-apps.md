---
title: Copy indices between Algolia apps w/ CLI
tags: snippet
layout: subs/layout-note.njk
---

Ensure the [Algolia CLI](https://www.algolia.com/doc/tools/cli/get-started/overview/#install-the-algolia-cli) is installed

```commandline
algolia profile add
```

Add both your profiles, e.g `account1`, `account`

```commandline
algolia objects browse INDEX_NAME > records.json --profile account1
```

Pull the records locally.

Then upload to second app and index (ensure you change the `--profile` flag ).

The `-F` (short for `--file`) flag in Algolia CLI lets you read from a JSON file.

```commandline
algolia objects import INDEX_2_NAME -F records.json --profile account2
```
