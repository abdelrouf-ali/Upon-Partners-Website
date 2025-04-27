
## Develop locally
If you wish to run this site locally, clone it, and run:

```bash
# install the dependencies
npm install

# run the build server with live reload
npm start
```


Alternatively, if you also wish to test things like the Netlify redirects which are specified in the netlify.toml file, you can use `netlify dev` to run the build.

```bash
# install netlify dev as part of the Netlify CLI
npm install -g netlify-cli

# run the build server with live reload and some Netlify sugar
netlify dev
```


