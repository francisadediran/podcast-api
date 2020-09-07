import { CategoryModel } from './category.model'

const categories = {}

categories.create = async (req, res) => {
  const { name } = req.body
  const exist = await CategoryModel.findOne({ name })
  if (exist) return res.status(400).send(`A ${req.body.name} Category already exists`)
  const cat = new CategoryModel(req.body)
  return cat
    .save()
    .then((catSaved) => {
      res.status(201).json(catSaved)
    })
    .catch(err => res.status(400).send(err))
}

export { categories }
