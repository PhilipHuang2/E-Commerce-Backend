const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
      const categoriesData = await Category.findAll(
        {
          include:
          [{model: Product}] 
        });
      res.status(200).json(categoriesData);
  }
  catch{
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const singleCategory = await Category.findByPk(req.params.id,{
      include:
      [{model: Product}] 
    });
    res.status(200).json(singleCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
  
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    // console.log(req.body);
    // console.log(req.params);
    const categoryData = await Category.update(req.body, {
      where: {id: req.params.id,}
    });
    console.log(categoryData);
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({ where: {id: req.params.id}});
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
