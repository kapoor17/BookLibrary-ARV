const accordionCover=document.querySelector("#accordion-cover");
const bookCover=accordionCover.querySelector(".book-cover");
const bookPreview=bookCover.querySelector(".preview-button");
const bookContentWP = accordionCover.querySelectorAll(".accordion-item.with-preview");
const bookContent = accordionCover.querySelectorAll(".accordion-item:not(.with-sub-chapters)");

const mainBook=document.querySelector("#main-book");
const returnButton=mainBook.querySelector(".return");
const bookChaptersWP = mainBook.querySelectorAll(".chapters.with-preview");
const bookChapters = mainBook.querySelectorAll(".chapters:not(.with-sub-chapters)");


console.log(bookContent);
// console.log(bookChapters);

bookPreview.addEventListener("click",()=>{
    bookCover.classList.toggle("variable-height-class");
})

bookContent.forEach((content,index)=>{
    content.addEventListener("click",()=>{
        if(content.classList.contains("with-preview")){
            mainBook.classList.remove("slide-main-book-out");
            mainBook.classList.add("slide-main-book-in");
            var goToPage=setTimeout(function(){
                            location.href="#";
                            location.href="#"+index;
                            return;
                        }, 500);
        }
    })
})


returnButton.addEventListener("click",()=>{
    mainBook.classList.add("slide-main-book-out");
    mainBook.classList.remove("slide-main-book-in");
})

