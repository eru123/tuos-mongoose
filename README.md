# tuos-mongoose
Tuos mongoose plugin

# INSTALL
### NPM
```bash
npm install tuos-mongoose
```
### YARN
```bash
yarn add tuos-mongoose
```


# USAGE
### Register the plugin
```js
const options = {
	mongoose: {
		// default connection
		connect: 'mongodb://localhost:27017/tuos', // String or Object
		
		// default options
		options: { 
			useNewUrlParser: true, 
	    config: { 
	      autoIndex: true
	    },
	    useUnifiedTopology: true
		}
	}
}

fastify.register(require('tuos-mongoose'), options)
```

### Access the mongoose instance
```
const mongoose = fastify.mongoose
```