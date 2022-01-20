const accordionCover=document.querySelector("#accordion-cover");
const bookCover=accordionCover.querySelector(".book-cover");
const bookPreview=bookCover.querySelector(".preview-button");
const bookContent = accordionCover.querySelectorAll(".accordion-item.with-preview");

const mainBook=document.querySelector("#main-book");
const returnButton=mainBook.querySelector(".return");
const bookChapters = mainBook.querySelectorAll(".chapters.with-preview");


console.log(bookContent);
console.log(bookChapters);

bookPreview.addEventListener("click",()=>{
    bookCover.classList.toggle("variable-height-class");
})

bookContent.forEach((content,index)=>{
    content.addEventListener("click",()=>{
        // window.location=index.href;
        mainBook.classList.remove("slide-main-book-out");
        mainBook.classList.add("slide-main-book-in");
    })
    
})

returnButton.addEventListener("click",()=>{
    mainBook.classList.add("slide-main-book-out");
    mainBook.classList.remove("slide-main-book-in");
})
