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








