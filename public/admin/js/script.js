// Button Status

const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length > 0 ) {
    let url = new URL(window.location.href)  // hàm để thêm URL

    buttonStatus.forEach(button => {
      button.addEventListener("click", () => {
        const status = button.getAttribute("button-status")
        
        if(status) {
           url.searchParams.set("status", status)
           // searchParams là đằng sau dấu ? ở url, set thêm để truy vấn query url trong controller
        } else {
           url.searchParams.delete("status")
        }

        window.location.href = url.href
      })
    })
}

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => { 
        // e là Event object - đối tượng chứa thông tin về sự kiện "submit" vừa xảy ra. 
        
        e.preventDefault(); // ngăn chặn reload lại trang mặc định
        
        const keyword = e.target.elements.keyword.value // là cái value nhận được sau khi bấm submit form
        
        if(keyword) {
            url.searchParams.set("keyword", keyword)
         } else {
            url.searchParams.delete("keyword")
         }
        window.location.href = url.href
    });
}

const buttonsPagination = document.querySelectorAll("[button-pagination]") 
    // thêm [] để lấy thuộc tính tự định nghĩa trong html
    let url = new URL(window.location.href)
    if(buttonsPagination) {
      buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
          const page = button.getAttribute("button-pagination")
  
          url.searchParams.set("page", page)

          window.location.href = url.href
        })
      })
}

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach((input) => {
      input.addEventListener("click", () => {
          const countChecked = checkboxMulti.querySelectorAll(
              "input[name='id']:checked"
          ).length

          console.log(inputsId.length)
          if(countChecked == inputsId.length) {
              inputCheckAll.checked = true   // mỗi ô input có dạng checker = true là đã tích
          } else {
              inputCheckAll.checked = false
          }
      })
    })
}

const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()  // submit của js tự reload trang thì phải chặn reload

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        )

        if(inputsChecked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(input => {
                const id = input.value // value là giá trị mặc định
                ids.push(id)
            })

            inputIds.value = ids.join(", ") // join(", ") để chuyển data từ js lấy được sang ô input dưới dạng text, string

            formChangeMulti.submit()
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi!")
        }
    })
}
















