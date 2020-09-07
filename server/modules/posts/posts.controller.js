// import uniq from 'lodash/uniq'
// import find from 'lodash/find'
// import flatten from 'lodash/flatten'
// import Topic from '../topics/topic.model'
import { PostModel } from './post.model'

const posts = {}

posts.create = async (req, res) => {
  const { title } = req.body
  const exist = await PostModel.findOne({ title })
  if (exist) return res.status(400).send(`A ${req.body.title} Post already exists`)
  const post = new PostModel(req.body)
  return post
    .save()
    .then((postSaved) => {
      res.status(201).json(postSaved)
    })
    .catch(err => { console.log('Post Saving error', err); res.status(400).send(err) })
}

posts.index = async (req, res) => {
  const posts = await PostModel.find({})
  return res.json({ data: { posts } })
}

posts.query = async (req, res) => {
  const {
    title = null
  } = req.query
  const query = {}

  if (title) query.title = title
  const posts = await PostModel.find({ title: { $regex: title, $options: 'i' } })
  return res.json({ data: { posts } })
}

posts.list = (req, res, next) => {
  const {
    limit = null,
    createdAtBefore = null,
    createdAfter = null,
    type = null,
    tags = null,
    categories = null,
    search: _search = null,
    transcripts = null,
    topic = null
  } = req.query

  const query = {}

  if (limit) query.limit = limit
  if (createdAtBefore) query.createdAtBefore = createdAtBefore
  if (createdAfter) query.createdAfter = createdAfter
  if (type) query.type = type
  if (req.user) query.user = req.user
  if (_search) query.search = _search
  if (transcripts) query.transcripts = transcripts

  if (tags) {
    query.tags = tags.split(',')
    let newTags = []; //eslint-disable-line
    query.tags.forEach((tag) => {
      newTags.push(tag) // parseInt(tag, 10))
    })
    query.tags = newTags
  }

  if (categories) {
    query.categories = categories.split(',')
    let newCats = []; //eslint-disable-line
    query.categories.forEach((cat) => {
      newCats.push(parseInt(cat, 10))
    })
    query.categories = newCats
  }

  if (topic) {
    query.topic = [topic]
  }

  PostModel.list(query)
    .then(async (posts) => {
      return res.json(posts)
    })
    .catch(e => next(e))
}

export {
  posts
}
