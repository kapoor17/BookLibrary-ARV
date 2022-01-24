//dom objects

    //accordion-wrapper objects

    const accordionCover=document.querySelector("#accordion-cover");
    const bookCover=accordionCover.querySelector(".book-cover");
    const bookPreview=bookCover.querySelector(".preview-button");
    const contentlibrary=accordionCover.querySelector(".content-library");
    const goToTop=accordionCover.querySelector(".go-back");
    const accordion=accordionCover.querySelector(".accordion");
    const bookContentWP = accordionCover.querySelectorAll(".chapter-nav.with-preview");
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
    const chapterUp=controls.querySelector(".chapter-up");
    const chapterDown=controls.querySelector(".chapter-down");
    const footnoteContainer = footer.querySelector(".foot-note")

//values from dom
    
//events

    bookPreview.addEventListener("click",()=>{
        accordionCover.classList.add("variable-height-class");
        setTimeout(() => {
            goToTop.classList.add("fixed");
        }, 750);
    })

    goToTop.addEventListener("click",()=>{
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
                window.setTimeout(()=>{$(targetChapter).find(".chapter-content").click()},1000);

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
        }

        if(nextNav.classList.contains("with-sub-chapters")){
            var nextNavContainer=nextNav.querySelector(".inner-accordion");
            
            nextNav=nextNavContainer.firstElementChild;
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
        }

        if(nextNav.classList.contains("with-sub-chapters")){
            var nextNavContainer=nextNav.querySelector(".inner-accordion");
            
            nextNav=nextNavContainer.lastElementChild;
        }

        moveChapters(chapterContainer,currentChapter,prevChapter);
        updateDots(currentNav,nextNav);

        
    })

    footnote.addEventListener("click",()=>{
        footer.classList.add("open");
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
        const chapterTitle=targetNav.querySelector(".accordion-header p")
        updateHeaderTitle(chapterTitle);

        if(currentNav)
            currentNav.classList.remove("current-chapter");
        if(targetNav)
            targetNav.classList.add("current-chapter")
    }

    var focusState=0;
    $(".chapter-content:not(.footnote)").on("click",function(){
        if(focusState==0)
        {
            focusState=1;
            $(".chapter-content").addClass("rescale");
            $(".header").addClass('slide-up');
            $(".footer").addClass('slide-down');
            return;
        }
        focusState=0;
        $(".chapter-content").removeClass("rescale");
        $(".header").removeClass('slide-up');
        $(".footer").removeClass('slide-down');

    });
    $(".footnote").on("click",function(){
        
    })
    const updateHeaderTitle=(targetTitle)=>{
        headerTitle.innerHTML=targetTitle.innerHTML;
    }
