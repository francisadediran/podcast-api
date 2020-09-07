import mongoose from 'mongoose'

const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  slug: { type: String, slug: 'name', unique: true },
  maintainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  maintainers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  topicPage: { type: mongoose.Schema.Types.ObjectId, ref: 'TopicPage' },
  postCount: { type: Number, default: 0 },
  status: { type: String, default: 'active' },
  isUserGenerated: { type: Boolean, default: false }
}, {
  timestamps: {
    createdAt: 'dateCreated',
    updatedAt: 'dateUpdated'
  }
})

module.exports = mongoose.model('Topic', TopicSchema)
