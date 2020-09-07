import Promise from 'bluebird'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../../helpers/APIError'

const slug = require('mongoose-slug-generator')
const slugOptions = { "'": '' }
mongoose.plugin(slug, slugOptions)

const TagSchema = new mongoose.Schema({
  id: Number,
  count: Number,
  description: String,
  link: String,
  name: String,
  slug: { type: String, slug: 'name', unique: true },
  meta: Array
})

/**
 * Statics
 */
TagSchema.statics = {
  /**
   * Get tag
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Tag, APIError>}
   */
  get (id) {
    return this.findOne({ id })
      .exec()
      .then((tag) => {
        if (tag) {
          return tag
        }
        const err = new APIError('No such tag exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * List tags
   * @param {number} skip - Number of tags to be skipped.
   * @param {number} limit - Limit number of tags to be returned.
   * @returns {Promise<Post[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find({})
      .sort({ id: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

TagSchema.index({ name: 'text', slug: 'text' })
/**
 * @typedef Tag
 */
const TagModel = mongoose.model('Tag', TagSchema)

export { TagModel }
