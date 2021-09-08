const mongoose = require('mongoose')
const fp = require('fastify-plugin')
const paginate = require('mongoose-paginate-v2')

const plugin = async function (fastify, options, done) {
  const defaultOpts = {
    useNewUrlParser: true,
    config: {
      autoIndex: true
    },
    useUnifiedTopology: true
  }

  if (!('mongoose' in options)) throw new Error('\'options.mongoose\' is not defined')

  const connect = options.mongoose.connect || 'mongodb://localhost:27017/tuos'
  const opts = options.mongoose.options || defaultOpts

  mongoose.plugin(paginate)

  await mongoose.connect(connect, opts)
    .then((e) => {
      console.log('[PLUGIN] mongoose: Connected.')
      fastify.decorate('mongoose', e)
    })
    .catch(e => {
      console.error('[PLUGIN] mongoose: Connect ERROR:', e.message)
      process.exit(1)
    })

  done()
}

module.exports = fp(plugin)
