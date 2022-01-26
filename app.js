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
        accordionCover.focus();
        setTimeout(() => {
            goToTop.classList.add("fixed");
        }, 750);
    })

    goToTop.addEventListener("click",()=>{
        goToTop.classList.remove("fixed");
        setTimeout(() => {
            accordionCover.classList.remove("variable-height-class");
        }, 300);
        bookCover.focus();
    })
    
    
    returnButton.addEventListener("click",()=>{
        mainBook.classList.add("slide-main-book-out");
        mainBook.classList.remove("slide-main-book-in");
    }) 


    footnote.addEventListener("click",()=>{
        footer.classList.add("open");
    })

   
    
    //functinons
    
    const moveChapters=(chapterContainer,currentChapter,targetChapter)=>{
        chapterContainer.style.transform="translateX(-"+targetChapter.offsetRight+")";
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
    var changeFocus=1;
    const focusSlide=()=>{
        if(changeFocus==1){
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
        }
    }
    
    $(".chapter-content:not(.footnote)").on("click",function(){
        changeFocus=1;
        if($(".foot-note").hasClass("slide-down")){
            focusSlide();
            return;
        }
        $(".close-footnote").click();
    });
    $(".close-footnote").on("click",function(){
        $(".foot-note").addClass("slide-down");
    });
    $(".footnote").on("click",function(event){
        event.stopPropagation();
        $(".foot-note").removeClass("slide-down");
        
    })
    const updateHeaderTitle=(targetTitle)=>{
        headerTitle.innerHTML=targetTitle.innerHTML;
    }
    // $("#main-container").on("scroll",function(event){
        //     event.preventDefault();
        // })
        
        //scrolling effects
        var ts;
        $(".book-cover").bind('touchstart', function (e){
            ts = e.originalEvent.touches[0].clientY;
        });
    
        $(".book-cover").bind('touchend', function (e){
            var te = e.originalEvent.changedTouches[0].clientY;
            if(ts > te+5){
                $(bookPreview).click();
            }
        });
    
        $(".book-cover").on("wheel",function(e){
            var delta = e.originalEvent.deltaY;
            if(delta>0)
            {
                $(bookPreview).click();
            }
        });
    
        var scrolled=false;
        var oldScroll=0;
        $(".content-library").bind('touchstart', function (e){
            ts = e.originalEvent.touches[0].clientY;
        });
    
        $(".content-library").bind('touchend', function (e){
            var scrollPos=$(".content-library").scrollTop();
            var te = e.originalEvent.changedTouches[0].clientY;
            var difference=Math.abs(te-ts);
            if(ts < te && scrollPos==0 && !scrolled && difference>50){
                $(goToTop).click();
            }
            else{
                scrolled=true;
            }
            if(scrollPos==0)
            {
                scrolled=false;
            }
        });                                              
        
        var chapterId=1;
        var currentChapter;
        var pageId=1;
        var chapterWidth=$(".chapters").width();
        var chapterCount=$(".chapters").length;        
        var currentBookMark;
        $(".chapter-bookmark").on("click",function(){
            chapterId=parseInt($(this).attr("data-chapterId"));
            currentChapter=$(".chapter-cover#ch"+chapterId);
            updateChapterBookmark();
            movePage(chapterId);
            mainBook.classList.remove("slide-main-book-out");
            mainBook.classList.add("slide-main-book-in");
            window.history.pushState({id:1},null,"?asdasd");
            setTimeout(()=>{$(".chapter-content").click();},900)
        })

        $(".chapter-controls").on("click",function(){
            var factor=parseInt($(this).attr("data-direction"));
            if( chapterId+factor==0 || chapterId+factor>chapterCount)
                return;
            chapterId+=factor;
            currentChapter=$(".chapter-cover#ch"+chapterId);
            updateChapterBookmark();
            movePage(chapterId);

        });
        
        var wheelCheck=false;   
        var upScroll=false;
        var downScroll=false;
        function movePage(pageTarget){
            $(".book-content").css("transform","translateY(-"+(pageTarget-1)*100+"vh)");
            var chapterContent=currentChapter.find(".chapter-content");
            chapterContent.scrollTop(0);
            if($("body").prop("scrollHeight")==chapterContent.prop("scrollHeight") && chapterContent.scrollTop()==0)
            {
                setTimeout(function(){
                    downScroll=true;
                    wheelCheck=true;
                },1200);
                $(".book-content").focus();
            }
            setTimeout(function(){
                wheelCheck=true;
                upScroll=true;
            },1200);
            if(downScroll==false)
                chapterContent.focus();
        }
        function updateChapterBookmark()
        {
            currentBookMark=$(".chapter-bookmark.chId-"+chapterId);
            $(".chapter-bookmark.current-chapter").removeClass("current-chapter");
            $(".accordion-collapse.show").removeClass("show");
            $(currentBookMark).addClass("current-chapter");
            if($(currentBookMark).parent().hasClass("inner-accordion")){
                $(currentBookMark).parents(".accordion-collapse").addClass("show");

            }
        }

        $(".chapter-content").on("scroll",function(e){
            if(!$(this).parent().attr("data-chapterNumber")==chapterId)
                return;  
            if(this.scrollHeight <= $(this).innerHeight()+$(this).scrollTop())
            {
                setTimeout(function(){
                    wheelCheck=true;
                    downScroll=true;
                },1200);
            }
            else{
                wheelCheck=false;
                downScroll=false;
            }
            if($(this).scrollTop()==0){
                setTimeout(function(){
                    wheelCheck=true;
                    upScroll=true;
                },1200);
            }
            else{
                wheelCheck=false;
                upScroll=false;
            }
            
        });
        var loading=false;
        $(".book-content").on("wheel",function(e){
            if(wheelCheck==false && upScroll==false && downScroll==false)
                return;
            var delta=e.originalEvent.deltaY;
            if(!loading)
            {
                loading=true;
                if(delta>0 && downScroll && wheelCheck==true)
                {
                    $("#next-chapter").click();
                }
                else if(delta<0 && upScroll && wheelCheck==true && currentChapter.find(".chapter-content").scrollTop()==0){
                        $("#prev-chapter").click();
                }
                upScroll=false;
                downScroll=false;
                wheelCheck=false;
                loading=false;
            }

        })

        $(".chapter-content").bind('touchstart', function (e){
            ts = e.originalEvent.touches[0].clientY;
        });
    
        $(".chapter-content").bind('touchend', function (e){
            var te = e.originalEvent.changedTouches[0].clientY;
            if(ts < te && upScroll && !scrolled){
                $("#prev-chapter").click();
                upScroll=false;
            }
            else if(ts > te && downScroll && !scrolled)
            {
                $("#next-chapter").click();
                downScroll=false;
            }
        });          

        function detectHistory(){
            currentChapter.find('.chapter-content').click();
            $(".return").click();
        }
            window.addEventListener("popstate",detectHistory);
