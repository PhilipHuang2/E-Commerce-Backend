// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product,{
    foreignKey: "category_id",
    onDelete: "Set NULL",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag
});
// Product.hasMany(ProductTag);
// ProductTag.hasMany(Product);
// Tag.hasMany(ProductTag);
// ProductTag.hasMany(Tag);

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
