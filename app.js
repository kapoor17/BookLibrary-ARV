//dom objects

    //accordion-wrapper objects

    const accordionCover=document.querySelector("#accordion-cover");
    const bookCover=accordionCover.querySelector(".book-cover");
    const bookPreview=bookCover.querySelector(".preview-button");
    const contentlibrary=accordionCover.querySelector(".content-library");
    const goToTop=accordionCover.querySelector(".go-back");
    const bookContentWP = accordionCover.querySelectorAll(".accordion-item.with-preview");
    const bookContent = accordionCover.querySelectorAll(".accordion-item:not(.with-sub-chapters)");
    
    //main-book objects

    const mainBook=document.querySelector("#main-book");
    const returnButton=mainBook.querySelector(".return");
    const chapterUp=mainBook.querySelector(".chapter-up");
    const chapterDown=mainBook.querySelector(".chapter-down");
    const chapterContainer=mainBook.querySelector(".book-content");
    const bookChapters = mainBook.querySelectorAll(".chapters");
    const bookChaptersWP = mainBook.querySelectorAll(".chapters.with-preview");

//values from dom
    
//events

    bookPreview.addEventListener("click",()=>{
        accordionCover.classList.add("variable-height-class");
        setTimeout(() => {
            goToTop.classList.add("fixed");
            contentlibrary.classList.add("pt-5");
        }, 1000);
    })

    goToTop.firstElementChild.addEventListener("click",()=>{
        goToTop.classList.remove("fixed");
        contentlibrary.classList.remove("pt-5");
        accordionCover.classList.remove("variable-height-class");
    })
    
    bookContent.forEach((content,index)=>{
        content.addEventListener("click",()=>{
            var contentText=content.querySelector(".accordion-preview");
            console.log(contentText);
            if(content.classList.contains("with-preview")){
                contentText.style.color="var(--blue-accent)"
                mainBook.classList.remove("slide-main-book-out");
                mainBook.classList.add("slide-main-book-in");
                setTimeout(function(){
                                location.href="#";
                                location.href="#"+index;
                                contentText.style.color="var(--black)"
                                return;
                            }, 500);
                }
            })
    })
    
    returnButton.addEventListener("click",()=>{
        mainBook.classList.add("slide-main-book-out");
        mainBook.classList.remove("slide-main-book-in");

        setTimeout(function(){
                    location.href="#";
                    return;
                }, 500);
    }) 

    chapterUp.addEventListener("click",()=>{
        chapterContainer.style.transform="translateY(-"+targetSlide.style.left+")";
    })

//functinons
    const setBookPosition=(bookChapters,index)=>{
        bookChapters.style.top=100*index+"vh"; 
    };

    bookChapters.forEach(setBookPosition);
