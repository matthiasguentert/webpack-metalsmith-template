# Description 

While developing my own blog using metalsmith I realized it would be better to segregate the asset compilation part and outsource it. I decided to go with webpack. 

Unfortunately I couldn't find many useful resources for webpack beginners like me on the concrete integration part with metalsmith. Especially the integration of `webpack-dev-server` was something I wasn't able to integrate and therefor switched to `browser-sync` and `webpack-dev-middleware`. 

This repository is meant as a template and cheat sheet. I will further develop it as soon as I get more insight into this topic or based on (welcome) feedback. 

# Watchable changes 

The following changes will cause a browser refresh

- A change to `./content` will also trigger a ms & wp rebuild
- A change to `./src/app/index.js` and its referenced items
- A change to `package.json` or `webpack.config.js` will restart the devserver

# Folder structure 

|Folder/File|Description|
|---|---|
|./content|Contains the metalsmith sources|
|./dist|Will contain the final build (webpack & metalsmith output)|
|./ms-build|A temporary directory for the metalsmith build output.|
|./src|Contains assets and build scripts|
|./src/devserver.js|Defines the development server|
|./src/index.js|The main entry point for webpack|
|./src/metalsmith-builder.js|Things relevant to the metalsmith build process go in here|
|./src/paths.js|Helper for path resolution|

# Todo
- Automatically inject script tags
- Find better way to inject images 
- Fix double metalsmith build on startup