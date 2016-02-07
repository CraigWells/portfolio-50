# BEAN.js

#### A Bootstrap, Express and AngularJS scaffold template for Node.

## Getting started

Create a folder to store the bean scaffold and CD into it:

- $ git pull https://github.com/CraigWells/bean_template.git
- $ npm install
- $ grunt

### Source and Distribution servers

The Bean.js package contains two node.js servers, one for development (src) and one for production (dist), these are both named server.js and reside in the src and dist folders respectively.

### src

- `$cd src`
- `$ node server.js`

The console will echo the following message: 
'Magic happens on port 8081'

### dist

- `$cd dist`
- `$ node server.js`
- The console will echo the following message: 'Magic happens on port 8080'


### Grunt

- The `grunt` call will by default call the `init` and `dist` methods defined in the Gruntfile.js.
- `init` copies all of the src/public/index.html dependencies from the node_modules folders into the src library
- `dist` copies the all of the contents of the src/public folder (excluding index.html) to the dist/public folder.
- `dist` also minimises script.js

#### #Note# 

index.html is not copied from src to dist, it is assumed the developer will match any changes in src/index.html manually. The reason for this is twofold:
- The application uses script.js in src and script.min.js in dist
- The html base tag in the index.html file references localhost:8081 in src and 8080 in dist