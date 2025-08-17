// [GET] /admin/products
const Product = require("../../models/product-model.js")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")

module.exports.index = async (req, res) => {
    
    const filterStatus = filterStatusHelper(req.query)

    let find = {
      deleted: false,
    }
    
    if(req.query.status) {
      find.status = req.query.status // truy vấn ở url
    }

    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
       find.title = objectSearch.regex
    }

    const products = await Product.find(find)
    
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}
