//dom objects

    //accordion-wrapper objects

    const accordionCover=document.querySelector("#accordion-cover");
    const previewButton=accordionCover.querySelector(".preview-button");

    const goToTop=accordionCover.querySelector(".go-back");
    const contentlibrary=accordionCover.querySelector(".content-library");
    const chapterNav = accordionCover.querySelectorAll(".chapter-nav");
    
    //main-book objects

    const mainBook=document.querySelector("#main-book");

    const bookCover = accordionCover.querySelector(".book-cover");
    const returnButton=mainBook.querySelector(".return");
    const headerTitle=mainBook.querySelector(".chapter-title");
    
    const bookContent=mainBook.querySelector(".book-content");
    const bookChapters = Array.from(bookContent.children);

    const footnote = mainBook.querySelector(".footnote")
    
    const footer = mainBook.querySelector(".footer");
    const controls = footer.querySelector(".controls");
    const arrows = controls.querySelector(".arrows");
    const chapterUp=controls.querySelector(".chapter-up");
    const chapterDown=controls.querySelector(".chapter-down");
    const closeFootnote = controls.querySelector(".close-footnote");
    const footnoteContainer = footer.querySelector(".foot-notes")

//values from dom
    var loggedIn=false;
    var xDown = null;                                                        
    var yDown = null;


//events
    bookCover.addEventListener('touchstart', handleTouchStart, false);        
    bookCover.addEventListener('touchmove', handleTouchMove, false);

    $(".book-cover").on("wheel",function(e){
        var delta = e.originalEvent.deltaY;
        if(delta>0)
            previewButton.click();
    });

    contentlibrary.addEventListener('touchstart', handleTouchStart, false);        
    contentlibrary.addEventListener('touchmove', handleTouchMove, false);
    
    // $(".content-library").on("wheel",function(e){
    //     var delta = e.originalEvent.deltaY;
    //     if(delta<0)
    //         goToTop.firstElementChild.click();
    // });

    previewButton.addEventListener("click",()=>{
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


    
    chapterNav.forEach((content,index)=>{
        content.addEventListener("click",()=>{
            if(content.classList.contains("with-preview")){               
                const currentNav= contentlibrary.querySelector(".current-chapter")
                if(currentNav)
                    currentNav.classList.remove("current-chapter");
                
                const chapterTitle=content.querySelector(".accordion-header p");
                updateHeaderTitle(chapterTitle);
                
                content.classList.add("current-chapter");


                mainBook.classList.add("slide-main-book-in");

                const currentChapter =  bookContent.querySelector(".current-chapter");
                const targetChapter = bookChapters[index];

                moveChapters(bookContent, currentChapter, targetChapter);

            }
        })
    })
    
    returnButton.addEventListener("click",()=>{
        mainBook.classList.remove("slide-main-book-in");
    }) 

    chapterDown.addEventListener("click",()=>{
        const currentChapter=bookContent.querySelector(".current-chapter");
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

        moveChapters(bookContent,currentChapter,nextChapter);
        updateDots(currentNav,nextNav);
        
    })

    chapterUp.addEventListener("click",()=>{
        const currentChapter=bookContent.querySelector(".current-chapter");
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

        moveChapters(bookContent,currentChapter,prevChapter);
        updateDots(currentNav,nextNav);

        
    })

    footnote.addEventListener("click",()=>{
        mainBook.classList.add("footnote-open");
        arrows.classList.add("d-none");
        closeFootnote.classList.remove("d-none");
    })

    closeFootnote.addEventListener("click",()=>{
        mainBook.classList.remove("footnote-open");
        arrows.classList.remove("d-none");
        closeFootnote.classList.add("d-none");
    })
    

//functinons
    function getTouches(evt) {
        return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
    }                                                     
                                                                           
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                           
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }
  
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
  
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                           
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */
            } else {
                /* left swipe */
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 

                /*bookCover*/
                if(this.classList.contains("book-cover"))
                    previewButton.click();
            } else { 
                /* up swipe */

                /*bookCover*/
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
      };


    const moveChapters=(bookContent,currentChapter,targetChapter)=>{
        targetChapter.scrollTo(0,0);
        bookContent.style.transform="translateY(-"+targetChapter.style.top+")";
        currentChapter.classList.remove("current-chapter");
        targetChapter.classList.add("current-chapter");
    }

    const setBookPosition=(bookChapters,index)=>{
        bookChapters.style.top=100*index+"%"; 
    };

    bookChapters.forEach(setBookPosition);

    
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

    // const divideChapterText=(chapter,index)=>{
    //     const parentHeight = chapter.getBoundingClientRect().height
    //     const chapterHeight = chapter.firstElementChild.getBoundingClientRect().height;
    //     const numberOfPages = Math.floor(chapterHeight/parentHeight)+1;

    //     console.log(chapterHeight,parentHeight);

    //     for(var i=1;i<numberOfPages;i++){
    //         var newPage=document.createElement("p");
    //         newPage.classList.add(i);
    //         newPage.classList.add("pages");
    //         chapter.appendChild(newPage);
    //     }
    //     console.log(chapter.children)
    // }

    // bookChapters.forEach(divideChapterText);

    const LogFunctions=()=>{
        if(loggedIn){
            //logIn Functions
            const previewRibbons=accordionCover.querySelectorAll(".corner-ribbon");
            previewRibbons.forEach(ribbon=>{
                ribbon.classList.add("d-none");
            })
        }
        else{
            //logOut Functions

        }
        
    }

    LogFunctions();