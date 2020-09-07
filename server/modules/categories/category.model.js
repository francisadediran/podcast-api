import Promise from 'bluebird'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../../helpers/APIError'

const slug = require('mongoose-slug-generator')
const slugOptions = { "'": '' }
mongoose.plugin(slug, slugOptions)

const CategorySchema = new mongoose.Schema({
  id: Number,
  description: String,
  name: String,
  slug: { type: String, slug: 'name', unique: true }
})

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * Get category
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Tag, APIError>}
   */
  get (id) {
    return this.findOne({ id })
      .exec()
      .then((cat) => {
        if (cat) {
          return cat
        }
        const err = new APIError('No such Category exists!', httpStatus.NOT_FOUND)
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

CategorySchema.index({ name: 'text' })

const CategoryModel = mongoose.model('Category', CategorySchema)

export { CategoryModel }
