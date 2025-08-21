const Product = require("../../models/product-model.js")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")

// [GET] /admin/products
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
    
    // Pagination
    const countProducts = await Product.countDocuments(find)
    let objectPagination = await paginationHelper(
      {
        currentPage: 1,
        limitItems: 4
      },
      req.query,
      countProducts
    )
    
    // End Pagination
    
    const products = await Product.find(find).limit
    (objectPagination.limitItems).skip(objectPagination.
    skip);
    
    res.render("admin/pages/products/index.pug", {
      pageTitle: "Trang danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  await Product.updateOne({_id: id}, {status: status})

  // Redirect back to current page with all existing query parameters   // res.redirect("/admin/products") là code gốc
  const currentUrl = new URL(req.headers.referer || "/admin/products")
  res.redirect(currentUrl.pathname + currentUrl.search)
  // console.log(url.pathname) // "/admin/products"
  // console.log(url.search)   // "?page=2"
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ") // split(", ") đổi sang dạng mảng 

  switch (type) {
      case "active":
          await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
          // { _id: { $in: ids } }
          // tìm tất cả ids nằm trong _id để update hàng loạt
          break
      case "inactive":
          await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
          break
      default:
          break
  }

  const currentUrl = new URL(req.headers.referer || "/admin/products")
  res.redirect(currentUrl.pathname + currentUrl.search)
}








