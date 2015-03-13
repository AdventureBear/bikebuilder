/**
 * Created by suzanne on 3/12/15.
 */
// app/models/qbp.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    prod_id: String,
    upc: Number,
    category: String,
    brand: String,
    model: String,
    model_description: String,
    size: String,
    color: String,
    msrp: Number,
    map: Number,
    each_cost: Number,
    manufacturer_prod:String,
    coo: String,
    discontinued: String,
    uom:String,
    weight: Number,
    length:Number,
    width:Number,
    height:Number,
    ormd:String,
    product_description:String,
    replacement:String,
    substitute:String

});

module.exports = mongoose.model('Product', ProductSchema);

