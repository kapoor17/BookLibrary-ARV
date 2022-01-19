const bookCover=document.querySelector(".book-cover");
const bookPreview=bookCover.querySelector(".preview-button");

bookPreview.addEventListener("click",()=>{
    bookCover.classList.toggle("variable-height-class");
})