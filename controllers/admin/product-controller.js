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

    // pagination
    let objectPagination = {
      currentPage: 1,
      limitItems: 4
    }

    if(req.query.page) {
      objectPagination.currentPage = parseInt(req.query.page)
    }
    
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems

    const countProducts = await Product.countDocuments(find)
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems)  // hàm toán làm tròn 4.75 thành 5
    objectPagination.totalPage = totalPage
    
    
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
