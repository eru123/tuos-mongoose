const mongoose = require('mongoose')
const fp = require('fastify-plugin')

const plugin = async function(fastify, options, done) {

  const defaultOpts = {
    useNewUrlParser: true,
    config: {
      autoIndex: true
    },
    useUnifiedTopology: true
  } 

  if(!('mongoose' in options)) throw new Error(`[PLUGIN] mongoose: 'options.mongoose' is not defined`)

  const connect = options.mongoose.connect || 'mongodb://localhost:27017/tuos'
  const opts = options.mongoose.options || defaultOpts 

  process.on('unhandledRejection', e => {
    console.error('[PLUGIN] mongoose: Connect ERROR: Timeout')
    process.exit(1)
  });

  await mongoose.connect(connect, opts)
    .then(() => {
      console.log('[PLUGIN] mongoose: Connected.')
      process.on('unhandledRejection', () => null);
    })
    .catch(e => {
      console.error('[PLUGIN] mongoose: Connect ERROR:', e.message)
      process.exit(1)
    })

  fastify.decorate('mongoose', mongoose)

  done()
}

module.exports = fp(plugin)