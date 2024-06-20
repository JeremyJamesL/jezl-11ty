---
title: Bash function to npm build and deploy to server
tags: note
layout: subs/layout-note.njk
---

Here is the single command I use to deploy this site to my Vultr VPS:

```commandline
npm run build && scp -r _site/* root@yourserver.com:/var/www/your-awesome-website.com
```

Add it as a `vps-deploy` alias (as an example) to `.bashrc` and it builds and deploys to the VPS consecutively.
