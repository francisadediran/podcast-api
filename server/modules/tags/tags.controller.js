import { TagModel } from './tag.model'

const tags = {}

tags.create = async (req, res) => {
  const { name } = req.body
  const exist = await TagModel.findOne({ name })
  if (exist) return res.status(400).send(`A ${req.body.data.name} Tag already exists`)
  const tag = new TagModel(req.body)
  console.log('HRE', tag)
  return tag
    .save()
    .then((postSaved) => {
      res.status(201).json(postSaved)
    })
    .catch(err => res.status(400).send(err))
}

export { tags }
