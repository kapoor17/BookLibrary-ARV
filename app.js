//dom objects

    //accordion-wrapper objects

    const accordionCover=document.querySelector("#accordion-cover");
    const bookCover=accordionCover.querySelector(".book-cover");
    const bookPreview=bookCover.querySelector(".preview-button");
    const contentlibrary=accordionCover.querySelector(".content-library");
    const goToTop=accordionCover.querySelector(".go-back");
    const accordion=accordionCover.querySelector(".accordion");
    const bookContentWP = accordionCover.querySelectorAll(".accordion-item.with-preview");
    const bookContent = accordionCover.querySelectorAll(".accordion-item:not(.with-sub-chapters)");
    
    //main-book objects

    const mainBook=document.querySelector("#main-book");

    const returnButton=mainBook.querySelector(".return");
    
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
    
//events

    bookPreview.addEventListener("click",()=>{
        accordionCover.classList.add("variable-height-class");
        setTimeout(() => {
            goToTop.classList.add("fixed");
        }, 1000);
    })

    goToTop.addEventListener("click",()=>{
        goToTop.classList.remove("fixed");
        contentlibrary.classList.remove("pt-5");
        accordionCover.classList.remove("variable-height-class");
    })


    // accordion.addEventListener("click",(e)=>{
    //     console.log(e.target.closest("div"));
    //     if(e.target.closest("div")){
    //         if(e.tar)
    //         mainBook.classList.remove("slide-main-book-out");
    //         mainBook.classList.add("slide-main-book-in");
    //     }
    // })
    
    bookContent.forEach((content,index)=>{

        content.addEventListener("click",()=>{
            
            // if(content.classList.contains("with-preview")){
                
                const currentNav= contentlibrary.querySelector(".current-chapter")
                if(currentNav)
                    currentNav.classList.remove("current-chapter");
                content.classList.add("current-chapter");

                mainBook.classList.remove("slide-main-book-out");
                mainBook.classList.add("slide-main-book-in");

                const currentChapter =  chapterContainer.querySelector(".current-chapter");
                const targetChapter = bookChapters[index];

                moveChapters(chapterContainer, currentChapter, targetChapter);

            // }
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
        const nextNav=currentNav.nextElementSibling;

        moveChapters(chapterContainer,currentChapter,nextChapter);
        updateDots(currentNav,nextNav);
        
    })

    chapterUp.addEventListener("click",()=>{
        const currentChapter=chapterContainer.querySelector(".current-chapter");
        const prevChapter=currentChapter.previousElementSibling;
        const currentNav= contentlibrary.querySelector(".current-chapter");
        const nextNav=currentNav.previousElementSibling;
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
        chapterContainer.style.transform="translateY(-"+targetChapter.style.top+")";
        currentChapter.classList.remove("current-chapter");
        targetChapter.classList.add("current-chapter");
    }

    const updateDots=(currentNav,targetNav)=>{
        if(currentNav)
            currentNav.classList.remove("current-chapter");
        if(targetNav)
            targetNav.classList.add("current-chapter")
    }

    var focusState=0;
    $(".book-content").on("click",function(){
        if(focusState==0)
        {
            focusState=1;
            $(".book-content").addClass("p-0");
            $(".header").addClass('slide-up');
            $(".footer").addClass('slide-down');
            return;
        }
        focusState=0;
        $(".book-content").removeClass("p-0");
        $(".header").removeClass('slide-up');
        $(".footer").removeClass('slide-down');

    })
