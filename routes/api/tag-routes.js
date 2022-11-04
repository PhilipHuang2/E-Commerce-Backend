const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model:Product}]});
      res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model:Product}]});
      res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "new School",
      productIds: [1, 2, 3, 4]
    }
  */
  try{
    const tagData = await Tag.create(req.body);
    if(req.body.productIds.length){
      const tagProductIdArr = req.body.productIds.map((product_id) =>{
        return {
          tag_id: tagData.id,
          product_id
        }
      });
      ProductTag.bulkCreate(tagProductIdArr);
    }
    res.status(200).json(tagData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body,{ where: {id: req.params.id}});
    const 
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = Tag.destroy({ where: {id: req.params.id}});
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
