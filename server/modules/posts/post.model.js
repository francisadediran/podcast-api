import mongoose from 'mongoose'
import moment from 'moment'

const slug = require('mongoose-slug-generator')

const slugOptions = { "'": '' } // john's url will be johns-url
mongoose.plugin(slug, slugOptions)

const PostSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  excerpt: String,
  categories: Array,
  date: { type: Date, default: Date.now },
  featuredImage: String,
  guestImage: String,
  link: String,
  mp3: String,
  tags: Array,
  topics: Array,
  relatedPosts: Array,
  transcriptUrl: { type: String, default: '' },
  slug: { type: String, slug: 'title', unique: true },
  score: { type: Number, default: 0 },
  totalFavorites: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 }
})
PostSchema.statics = {
  /**
   * Standard list of fields to select for find Post queries
   */
  standardSelectForFind: [
    'content',
    'totalFavorites',
    'title',
    'date',
    'mp3',
    'link',
    'score',
    'slug',
    'featuredImage',
    'guestImage',
    'upvoted',
    'downvoted',
    'tags',
    'categories',
    'thread',
    'excerpt',
    'transcriptUrl',
    'topics'
  ].join(' '),

  /**
   * List posts in descending order of 'createdAt' timestamp.
   * @param {number} limit - Limit number of posts to be returned.
   * @param {date} createdAtBefore - Date post was created before.
   * @param {date} createdAfter - Date post was created after.
   * @param {list} tags - List of Tags Ids
   * @param {list} categories - List of Categories
   * @param {string} search - Post Title to search
   * @param {string} transcripts - Get posts with or without transcripts
   * @returns {Promise<Post[]>}
   */
  async list ({
    title = null,
    content = null,
    slugs = [],
    limit = 10,
    createdAtBefore = null,
    user = null,
    createdAfter = null,
    type = null,
    tags = [],
    categories = [],
    topic = null,
    search = null,
    transcripts = null
  } = {}) {
    const limitOption = parseInt(limit, 10)
    let query = {}

    let dateDirection = -1
    if (createdAtBefore) {
      query.date = {
        $lt: moment(createdAtBefore).toDate()
      }
    }

    if (createdAfter) {
      dateDirection = 1
      query.date = {
        $gt: moment(createdAfter).toDate()
      }
    }

    if (tags.length > 0) query.tags = { $all: tags }
    if (categories.length > 0) query.categories = { $all: categories }
    if (query.slugs && query.slugs.length) query.slug = { $in: slugs }
    if (topic) query.topics = { $in: topic }

    if (search) {
      query = ({
        $or:
          [
            { title: { $regex: title, $options: 'i' } },
            { content: { $regex: title, $options: 'i' } }
          ]
      }, this.standardSelectForFind)
    }

    if (transcripts === 'true') {
      query.transcriptUrl = { $exists: true }
    } else if (transcripts === 'false') {
      query.transcriptUrl = { $exists: false }
    }

    let sort = { date: dateDirection }

    if (type === 'top') {
      sort = { score: -1 }
    }

    const queryPromise = this.find(query, this.standardSelectForFind)
      .sort(sort)
      .limit(limitOption)

    return queryPromise.then(postsFound => postsFound)
  }
}
PostSchema.index({ title: 'text' })

const PostModel = mongoose.model('Post', PostSchema)

export { PostModel }

