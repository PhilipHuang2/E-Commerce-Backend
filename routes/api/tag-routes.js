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
  try{
    // update a tag's name by its `id` value
    const tagData = await Tag.update(req.body,{ where: {id: req.params.id}});
    // find all the associated products with the old tag name
    const tagsProduct = await ProductTag.findAll({where: {tag_id: req.params.id}});
    // get list of current product_ids
    const tagProductIds = tagsProduct.map(({product_id}) => product_id);
    //create filtered List of new product_ids
    const newProductTags = req.body.productIds
      .filter((product_id)=> !tagProductIds.includes(product_id))
      .map((product_id)=> {
        return {
          tag_id: req.params.id,
          product_id
        };
      });
      // figure out which ones to remove
    const productTagstoRemove = tagsProduct
      .filter(({product_id}) => !req.body.productIds.includes(product_id))
      .map(({id}) => id);
    // both productTagsToRemove and don't have proper stuff
    console.log(productTagstoRemove);
    console.log(newProductTags);
    await ProductTag.destroy({where: {id: productTagstoRemove}});
    const updatedProductTags = await ProductTag.bulkCreate(newProductTags);  
    res.status(200).json(updatedProductTags);
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
