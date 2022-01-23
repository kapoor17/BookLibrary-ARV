//dom objects

    //accordion-wrapper objects

    const accordionCover=document.querySelector("#accordion-cover");
    const bookPreview=accordionCover.querySelector(".preview-button");
    const contentlibrary=accordionCover.querySelector(".content-library");
    const goToTop=accordionCover.querySelector(".go-back");
    const bookContent = accordionCover.querySelectorAll(".chapter-nav");
    
    //main-book objects

    const mainBook=document.querySelector("#main-book");

    const returnButton=mainBook.querySelector(".return");
    const headerTitle=mainBook.querySelector(".chapter-title");
    
    const chapterContainer=mainBook.querySelector(".book-content");
    const bookChapters = Array.from(chapterContainer.children);
    const bookChaptersWP = mainBook.querySelectorAll(".chapters.with-preview");
    const footnote = mainBook.querySelector(".footnote")
    
    const footer = mainBook.querySelector(".footer");
    const controls = footer.querySelector(".controls");
    const arrows = controls.querySelector(".arrows");
    const chapterUp=controls.querySelector(".chapter-up");
    const chapterDown=controls.querySelector(".chapter-down");
    const closeFootnote = controls.querySelector(".close-footnote");
    const footnoteContainer = footer.querySelector(".foot-notes")

//values from dom

// var lastScrollTop = 0;

// document.addEventListener("scroll", function(){
//     alert();
//    var st = window.pageYOffset || document.documentElement.scrollTop;
//    if (st > lastScrollTop){
//       // downscroll code
//       goToTop.classList.remove("fixed");
//         setTimeout(() => {
//             accordionCover.classList.remove("variable-height-class");
//         }, 300);
//    } else {
//       // upscroll code
//       accordionCover.classList.add("variable-height-class");
//         setTimeout(() => {
//             goToTop.classList.add("fixed");
//         }, 750);
//    }
//    lastScrollTop = st <= 0 ? 0 : st; 
// }, false);
    
//events
    bookPreview.addEventListener("click",()=>{
        accordionCover.classList.add("variable-height-class");
        setTimeout(() => {
            goToTop.classList.add("fixed");
        }, 750);
    })

    goToTop.firstElementChild.addEventListener("click",()=>{
        goToTop.classList.remove("fixed");
        setTimeout(() => {
            accordionCover.classList.remove("variable-height-class");
        }, 300);
    })
    
    bookContent.forEach((content,index)=>{

        content.addEventListener("click",()=>{
            
            if(content.classList.contains("with-preview")){
                
                
                const currentNav= contentlibrary.querySelector(".current-chapter")
                if(currentNav)
                    currentNav.classList.remove("current-chapter");
                
                const chapterTitle=content.querySelector(".accordion-header p");
                updateHeaderTitle(chapterTitle);
                
                content.classList.add("current-chapter");


                mainBook.classList.remove("slide-main-book-out");
                mainBook.classList.add("slide-main-book-in");

                const currentChapter =  chapterContainer.querySelector(".current-chapter");
                const targetChapter = bookChapters[index];

                moveChapters(chapterContainer, currentChapter, targetChapter);

            }
        })
    })
    
    returnButton.addEventListener("click",()=>{
        mainBook.classList.add("slide-main-book-out");
        mainBook.classList.remove("slide-main-book-in");
    }) 


    chapterDown.addEventListener("click",()=>{
        const currentChapter=chapterContainer.querySelector(".current-chapter");
        const nextChapter=currentChapter.nextElementSibling;

        const currentNav= contentlibrary.querySelector(".current-chapter");
        var nextNav=currentNav.nextElementSibling;

        if(!nextNav){
            var nextNavContainer=currentNav.closest("div.with-sub-chapters");
            nextNav=nextNavContainer.nextElementSibling;
            nextNavContainer.querySelector(".accordion-collapse").classList.remove("show")
        }

        if(nextNav.classList.contains("with-sub-chapters")){
            var nextNavContainer=nextNav.querySelector(".inner-accordion");
            
            nextNav=nextNavContainer.firstElementChild;
            nextNavContainer.closest("div.accordion-collapse").classList.add("show")
        }

        moveChapters(chapterContainer,currentChapter,nextChapter);
        updateDots(currentNav,nextNav);
        
    })

    chapterUp.addEventListener("click",()=>{
        const currentChapter=chapterContainer.querySelector(".current-chapter");
        const prevChapter=currentChapter.previousElementSibling;

        const currentNav= contentlibrary.querySelector(".current-chapter");
        var nextNav=currentNav.previousElementSibling;

        if(!nextNav){
            var nextNavContainer=currentNav.closest("div.with-sub-chapters");
            nextNav=nextNavContainer.previousElementSibling;
            nextNavContainer.querySelector(".accordion-collapse").classList.remove("show")

        }

        if(nextNav.classList.contains("with-sub-chapters")){
            var nextNavContainer=nextNav.querySelector(".inner-accordion");
            
            nextNav=nextNavContainer.lastElementChild;
            nextNavContainer.closest("div.accordion-collapse").classList.add("show")
        }

        moveChapters(chapterContainer,currentChapter,prevChapter);
        updateDots(currentNav,nextNav);

        
    })

    footnote.addEventListener("click",()=>{
        footer.classList.add("open");
        arrows.classList.add("d-none");
        closeFootnote.classList.remove("d-none");
    })

    closeFootnote.addEventListener("click",()=>{
        footer.classList.remove("open");
        arrows.classList.remove("d-none");
        closeFootnote.classList.add("d-none");
    })
    

//functinons
    const setBookPosition=(bookChapters,index)=>{
        bookChapters.style.top=100*index+"vh"; 
    };

    bookChapters.forEach(setBookPosition);

    const moveChapters=(chapterContainer,currentChapter,targetChapter)=>{
        targetChapter.scrollTo(0,0);
        chapterContainer.style.transform="translateY(-"+targetChapter.style.top+")";
        currentChapter.classList.remove("current-chapter");
        targetChapter.classList.add("current-chapter");
    }
    
    const updateDots=(currentNav,targetNav)=>{
        const chapterTitle=targetNav.querySelector(".accordion-header p")
        updateHeaderTitle(chapterTitle);

        if(currentNav)
            currentNav.classList.remove("current-chapter");
        if(targetNav)
            targetNav.classList.add("current-chapter")
    }

    const updateHeaderTitle=(targetTitle)=>{
        headerTitle.innerHTML=targetTitle.innerHTML;
    }