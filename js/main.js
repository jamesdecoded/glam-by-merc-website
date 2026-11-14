/* Glam by Mer-c: gallery, filters, photo viewer, scroll effects.
   Gallery items are listed in the "items" array below: [media key, category, caption]. */
const M={
 "i0": "assets/images/gold-coral-eyes.jpg",
 "i1": "assets/images/rose-event-glam.jpg",
 "i2": "assets/images/berry-lip-soft-glam.jpg",
 "i3": "assets/images/graduation-day.jpg",
 "i4": "assets/images/night-out.jpg",
 "i5": "assets/images/birthday-shoot-glam.jpg",
 "i6": "assets/images/glossy-lip-glow.jpg",
 "i7": "assets/images/mercy-mukunda-portrait.jpg",
 "i8": "assets/images/copper-evening-glam.jpg",
 "i9": "assets/images/colorful-stage-glam.jpg",
 "i10": "assets/images/feathered-stage-glam.jpg",
 "i11": "assets/images/red-celebration-glam.jpg",
 "i12": "assets/images/graduation-glam.jpg",
 "i13": "assets/images/graduation-shoot-glam.jpg",
 "i14": "assets/images/soft-peach-glam.jpg",
 "i15": "assets/images/golden-shimmer-glam.jpg",
 "v0": "assets/video/reel-1.mp4",
 "v0p": "assets/images/reel-1-poster.jpg",
 "v1": "assets/video/reel-2.mp4",
 "v1p": "assets/images/reel-2-poster.jpg",
 "v2": "assets/video/reel-3.mp4",
 "v2p": "assets/images/reel-3-poster.jpg"
};
var $=function(s,r){return (r||document).querySelector(s)};

/* Resolve data-m image sources */
document.querySelectorAll("[data-m]:not([data-hero-slide])").forEach(function(e){
  if(M[e.dataset.m])e.src=M[e.dataset.m];
});
var secondaryHeroImages=Array.from(document.querySelectorAll("[data-hero-slide][data-m]")).slice(1);
function loadSecondaryHeroImages(){
  secondaryHeroImages.forEach(function(e){if(!e.src&&M[e.dataset.m])e.src=M[e.dataset.m]});
}
if(secondaryHeroImages.length){
  if("requestIdleCallback" in window)requestIdleCallback(loadSecondaryHeroImages,{timeout:2000});
  else setTimeout(loadSecondaryHeroImages,500);
}

/* Hero slideshow */
var heroSlides=Array.from(document.querySelectorAll(".hero-slide")),heroIdx=0;
var motionPreference=matchMedia("(prefers-reduced-motion: reduce)"),heroTimer;
function startHeroSlideshow(){
  clearInterval(heroTimer);
  if(heroSlides.length<2||motionPreference.matches)return;
  heroTimer=setInterval(function(){
    if(document.hidden)return;
    heroSlides[heroIdx].classList.remove("is-active");
    heroIdx=(heroIdx+1)%heroSlides.length;
    heroSlides[heroIdx].classList.add("is-active");
  },7000);
}
startHeroSlideshow();
motionPreference.addEventListener("change",startHeroSlideshow);
document.addEventListener("visibilitychange",function(){
  if(!document.hidden)startHeroSlideshow();
  else clearInterval(heroTimer);
});

/* Gallery */
var items=[["i0","Bridal","Bridal team glam"],["v1","Reels","Soft glam for two"],["i6","Events","Soft glam for a wedding guest"],["i14","Shoots","Soft peach glam"],["i15","Shoots","Golden shimmer glam"],["i1","Events","Rose tones for an event"],["i3","Graduation","Graduation day makeup"],["i12","Graduation","Graduation portrait glam"],["i13","Shoots","Graduation shoot glam"],["i11","Bridal","Bridal glam"],["i2","Bridal","Berry lip bridal look"],["v0","Reels","Event makeup, final touches"],["i8","Events","Copper evening glam"],["v2","Reels","Camera-ready groom makeup"],["i4","Shoots","Video shoot with Iyanni and his crew"],["i9","Shoots","Colourful stage glam"],["i5","Shoots","Birthday shoot glam"],["i10","Shoots","Feathered stage glam"]];
var mas=$("#mas");

/* Build tab counts */
var tabCounts={all:items.length};
items.forEach(function(it){tabCounts[it[1]]=(tabCounts[it[1]]||0)+1;});
document.querySelectorAll(".tabs button").forEach(function(btn){
  var f=btn.dataset.f,count=f==="all"?tabCounts.all:(tabCounts[f]||0);
  if(count>0)btn.innerHTML=btn.textContent;
});

items.forEach(function(it,n){
  var v=it[0][0]==="v",el=document.createElement("figure");
  el.className="it rv";el.dataset.c=it[1];el.dataset.k=it[0];
  el.style.setProperty("--rd",(n%3)*.08+"s");
  el.setAttribute("role","button");
  el.setAttribute("tabindex","0");
  el.setAttribute("aria-label","Open: "+it[2]);
  var media=document.createElement(v?"video":"img");
  if(v){
    media.muted=true;media.loop=true;media.playsInline=true;media.autoplay=true;media.preload="auto";
    media.poster=M[it[0]+"p"]||"";
    media.setAttribute("aria-hidden","true");
    if(M[it[0]])media.src=M[it[0]];
  }else{
    media.alt=it[2]+" makeup look";media.loading="lazy";
    if(M[it[0]])media.src=M[it[0]];
  }
  var cap=document.createElement("figcaption");cap.textContent=it[2];
  el.appendChild(media);el.appendChild(cap);
  mas.appendChild(el);
});

/* Filter tabs */
var tabs=document.querySelectorAll(".tabs button");
var workResults=$("#work-results");
function announceWorkResults(filter){
  var count=mas.querySelectorAll(".it:not([hidden])").length;
  workResults.textContent=filter==="all"
    ?"Showing all "+count+" portfolio items."
    :"Showing "+count+" "+filter+" portfolio items.";
}
announceWorkResults("all");
tabs.forEach(function(t){t.addEventListener("click",function(){
  tabs.forEach(function(x){x.setAttribute("aria-pressed",x===t)});
  mas.querySelectorAll(".it").forEach(function(p){
    p.hidden=t.dataset.f!=="all"&&p.dataset.c!==t.dataset.f;
    if(!p.hidden)p.classList.add("in");
  });
  announceWorkResults(t.dataset.f);
})});

/* Lightbox — uses lb-close instead of x */
var lb=$("#lb"),lbm=$("#lbm"),closeButton=$("#lb-close"),lbLast,bodyOverflow,modalIsolation=[];
function isolatePageFrom(modal,exceptions){
  modalIsolation=Array.from(document.body.children)
    .filter(function(el){return el!==modal&&exceptions.indexOf(el)===-1})
    .map(function(el){var wasInert=el.inert;el.inert=true;return{element:el,wasInert:wasInert}});
}
function restorePageIsolation(){
  modalIsolation.forEach(function(entry){entry.element.inert=entry.wasInert});
  modalIsolation=[];
}
function openLightbox(k,trigger){
  if(!M[k])return;
  lbLast=trigger;
  var v=k[0]==="v";
  lbm.innerHTML="";
  if(v){
    var wrap=document.createElement("div");wrap.className="lbv";
    var vid=document.createElement("video");
    vid.className="m";vid.src=M[k];vid.loop=true;vid.muted=true;vid.autoplay=true;vid.playsInline=true;vid.preload="auto";
    var playbackError=document.createElement("p");
    playbackError.className="lbv-error";playbackError.setAttribute("role","status");playbackError.hidden=true;
    wrap.appendChild(vid);
    wrap.appendChild(playbackError);
    lbm.appendChild(wrap);
    function showPlaybackError(error){
      playbackError.textContent=error&&error.name==="NotAllowedError"
        ?"Playback was blocked. Tap the video to try again."
        :location.protocol==="file:"
          ?"This browser can't play videos from a local file. Open the hosted site or use a local web server."
          :"This video format isn't supported by this browser.";
      playbackError.hidden=false;
    }
    function playVideo(){
      vid.play().then(function(){playbackError.hidden=true}).catch(showPlaybackError);
    }
    vid.addEventListener("error",function(){showPlaybackError(vid.error);});
    vid.addEventListener("click",function(){if(vid.paused)playVideo();});
    playVideo();
  }else{
    var e=document.createElement("img");e.className="m";e.src=M[k];e.alt="Enlarged makeup look";
    lbm.appendChild(e);
  }
  lb.inert=false;lb.setAttribute("aria-hidden","false");lb.classList.add("o");
  isolatePageFrom(lb,[]);
  bodyOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
  closeButton.focus();
}
function closeLightbox(){
  lb.classList.remove("o");lb.setAttribute("aria-hidden","true");lb.inert=true;
  restorePageIsolation();
  lbm.innerHTML="";document.body.style.overflow=bodyOverflow||"";
  if(lbLast)lbLast.focus();
}
mas.addEventListener("click",function(e){var b=e.target.closest(".it");if(b)openLightbox(b.dataset.k,b)});
mas.addEventListener("keydown",function(e){
  if(e.key==="Enter"||e.key===" "){var b=e.target.closest(".it");if(b){e.preventDefault();openLightbox(b.dataset.k,b);}}
});
closeButton.onclick=closeLightbox;
lb.addEventListener("click",function(e){if(e.target===lb)closeLightbox()});
document.addEventListener("keydown",function(e){
  if(!lb.classList.contains("o"))return;
  if(e.key==="Escape"){closeLightbox();return;}
  if(e.key==="Tab"){
    var focusable=[closeButton].concat(Array.from(lbm.querySelectorAll("video,[href],button,[tabindex]:not([tabindex='-1'])"))),
        first=focusable[0],lastF=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastF.focus();}
    else if(!e.shiftKey&&document.activeElement===lastF){e.preventDefault();first.focus();}
  }
});

/* Marquee */
var words=["Bridal","Events","Photo shoots","Graduations","Glam by Mer-c"],mt=$("#mt");
for(var r=0;r<4;r++)words.forEach(function(w){var s=document.createElement("span");s.textContent=w;mt.appendChild(s);});

/* Scroll-reveal */
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;
  e.target.classList.add("in");io.unobserve(e.target);
})},{threshold:.12,rootMargin:"0px 0px -40px 0px"}):null;
document.documentElement.classList.add("js");
document.querySelectorAll(".rv").forEach(function(e){io?io.observe(e):e.classList.add("in")});

/* Hamburger / drawer — uses its own isolation, separate from lightbox */
var burger=$("#nav-burger"),drawer=$("#nav-drawer"),overlay=$("#nav-overlay"),drawerBodyOverflow;
var drawerIsolation=[];
function isolateForDrawer(){
  drawerIsolation=Array.from(document.body.children)
    .filter(function(el){return el!==drawer&&el!==overlay})
    .map(function(el){var wasInert=el.inert;el.inert=true;return{element:el,wasInert:wasInert}});
}
function restoreDrawerIsolation(){
  drawerIsolation.forEach(function(entry){entry.element.inert=entry.wasInert});
  drawerIsolation=[];
}
function openDrawer(){
  drawer.classList.add("is-open");overlay.classList.add("is-open");
  drawer.inert=false;drawer.setAttribute("aria-hidden","false");
  isolateForDrawer();
  burger.setAttribute("aria-expanded","true");
  drawerBodyOverflow=document.body.style.overflow;
  document.body.style.overflow="hidden";
  $("#nav-drawer-close").focus();
}
function closeDrawer(){
  drawer.classList.remove("is-open");overlay.classList.remove("is-open");
  drawer.inert=true;drawer.setAttribute("aria-hidden","true");
  restoreDrawerIsolation();
  burger.setAttribute("aria-expanded","false");
  document.body.style.overflow=drawerBodyOverflow||"";
  burger.focus();
}
burger.addEventListener("click",openDrawer);
$("#nav-drawer-close").addEventListener("click",closeDrawer);
overlay.addEventListener("click",closeDrawer);
drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeDrawer)});
document.addEventListener("keydown",function(e){
  if(!drawer.classList.contains("is-open"))return;
  if(e.key==="Escape"){closeDrawer();return;}
  if(e.key!=="Tab")return;
  var focusable=Array.from(drawer.querySelectorAll("a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])"))
      .filter(function(el){return el.getClientRects().length>0}),
      first=focusable[0],last=focusable[focusable.length-1];
  if(!first)return;
  if(e.shiftKey&&(document.activeElement===first||!drawer.contains(document.activeElement))){
    e.preventDefault();last.focus();
  }else if(!e.shiftKey&&(document.activeElement===last||!drawer.contains(document.activeElement))){
    e.preventDefault();first.focus();
  }
});

/* Nav scroll border */
var tick=false,nav=$("#nav");
addEventListener("scroll",function(){
  if(tick)return;tick=true;
  requestAnimationFrame(function(){nav.classList.toggle("s",scrollY>10);tick=false});
},{passive:true});

/* Scroll progress bar */
var progressBar=$("#progress-bar");
addEventListener("scroll",function(){
  var pct=(scrollY/(document.documentElement.scrollHeight-innerHeight))*100;
  progressBar.style.width=Math.min(pct,100)+"%";
},{passive:true});

/* Scroll-to-top */
var scrollTopBtn=$("#scroll-top"),scrollTopCovered=false;
addEventListener("scroll",function(){
  var visible=scrollY>600&&!scrollTopCovered;
  scrollTopBtn.hidden=!visible;
  scrollTopBtn.classList.toggle("is-visible",visible);
},{passive:true});
scrollTopBtn.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});

/* Keep floating controls clear of hero and portfolio */
var wa=$(".wa"),hero=$(".hero");
if(window.IntersectionObserver){
  var visibleSections=new Set(),
      waObserver=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting)visibleSections.add(e.target);else visibleSections.delete(e.target)});
        wa.classList.toggle("is-hidden",visibleSections.size>0);
      },{threshold:.1});
  waObserver.observe(hero);
  waObserver.observe($("#work"));
  waObserver.observe($("#about"));
  var scrollTopCoveredSections=new Set(),
      scrollTopObserver=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting)scrollTopCoveredSections.add(e.target);
      else scrollTopCoveredSections.delete(e.target);
    });
    scrollTopCovered=scrollTopCoveredSections.size>0;
    var visible=scrollY>600&&!scrollTopCovered;
    scrollTopBtn.hidden=!visible;
    scrollTopBtn.classList.toggle("is-visible",visible);
  },{threshold:.1});
  scrollTopObserver.observe(hero);
  scrollTopObserver.observe($("#work"));
}

/* Scroll-spy */
var navAnchors=Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
var spySections=navAnchors.map(function(a){return document.querySelector(a.getAttribute("href"));}).filter(Boolean);
function updateSpy(){
  var sy=window.scrollY+80,active=null;
  for(var i=spySections.length-1;i>=0;i--){
    if(spySections[i].getBoundingClientRect().top+window.scrollY<=sy){active=spySections[i];break;}
  }
  navAnchors.forEach(function(a){
    var isActive=!!active&&a.getAttribute("href")==="#"+active.id;
    a.classList.toggle("active",isActive);
    if(isActive)a.setAttribute("aria-current","location");
    else a.removeAttribute("aria-current");
  });
}
addEventListener("scroll",updateSpy,{passive:true});
updateSpy();

/* FAQ accordion */
document.querySelectorAll(".faq-item dt button").forEach(function(btn){
  btn.addEventListener("click",function(){
    var expanded=btn.getAttribute("aria-expanded")==="true";
    btn.setAttribute("aria-expanded",!expanded);
    btn.closest(".faq-item").querySelector("dd").hidden=expanded;
  });
});

/* Dynamic footer year */
var fyEl=$("#footer-year");
if(fyEl)fyEl.textContent=new Date().getFullYear();

/* Copy phone number */
var copyEl=$(".contact-copy");
if(copyEl){
  var toast=document.createElement("div");
  toast.className="copy-toast";toast.textContent="Number copied!";
  document.body.appendChild(toast);
  copyEl.addEventListener("click",function(e){
    var num=copyEl.dataset.copy;
    if(!num)return;
    if(navigator.clipboard){
      e.preventDefault();
      navigator.clipboard.writeText(num).then(function(){showToast();});
    }
  });
  function showToast(){
    toast.classList.add("show");
    setTimeout(function(){toast.classList.remove("show");},2200);
  }
}

/* Before & after slider — lerp + intro sweep + breathe + drag hint */
(function(){
  var slider=$(".ba-slider");
  if(!slider)return;
  var handle=$(".ba-handle",slider);
  var before=$(".ba-before",slider);
  var hint=$(".ba-hint",slider);
  var target=50,current=50,dragging=false,swept=false,rafId=null,breatheTimer=null,interacted=false;

  function applyPos(p){
    before.style.clipPath="inset(0 "+(100-p)+"% 0 0)";
    handle.style.left=p+"%";
    handle.setAttribute("aria-valuenow",Math.round(p));
  }
  function lerp(a,b,t){return a+(b-a)*t;}
  function loop(){
    current=lerp(current,target,.1);
    applyPos(current);
    if(Math.abs(current-target)>0.05){rafId=requestAnimationFrame(loop);}
    else{applyPos(target);rafId=null;}
  }
  function setTarget(p){
    target=Math.max(2,Math.min(98,p));
    if(!rafId)rafId=requestAnimationFrame(loop);
  }
  function posFromEvent(e){
    var r=slider.getBoundingClientRect();
    var clientX=e.touches?e.touches[0].clientX:e.clientX;
    return ((clientX-r.left)/r.width)*100;
  }
  function stopHint(){
    if(interacted)return;
    interacted=true;
    if(hint)hint.classList.add("is-hidden");
    if(breatheTimer){clearTimeout(breatheTimer);breatheTimer=null;}
  }

  /* Breathing loop — gentle left/right drift after sweep settles */
  function startBreathe(){
    if(interacted||motionPreference.matches)return;
    var frames=[{t:0,v:50},{t:.38,v:34},{t:.65,v:54},{t:1,v:50}];
    function ease(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
    function interp(p){
      for(var i=0;i<frames.length-1;i++){
        var a=frames[i],b=frames[i+1];
        if(p>=a.t&&p<=b.t){var l=(p-a.t)/(b.t-a.t);return a.v+(b.v-a.v)*ease(l);}
      }
      return 50;
    }
    var dur=2800,start=null;
    function tick(ts){
      if(interacted)return;
      if(!start)start=ts;
      var p=Math.min((ts-start)/dur,1);
      current=target=interp(p);
      applyPos(current);
      if(p<1){requestAnimationFrame(tick);}
      else{start=null;breatheTimer=setTimeout(function(){requestAnimationFrame(tick);},700);}
    }
    breatheTimer=setTimeout(function(){requestAnimationFrame(tick);},900);
  }

  /* Intro sweep: 80 → 18 → 55 → 50 */
  function runSweep(){
    if(swept||motionPreference.matches){applyPos(50);startBreathe();return;}
    swept=true;
    var start=null,dur=1600;
    var keyframes=[{t:0,v:80},{t:.45,v:18},{t:.78,v:55},{t:1,v:50}];
    function ease(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
    function interp(progress){
      for(var i=0;i<keyframes.length-1;i++){
        var a=keyframes[i],b=keyframes[i+1];
        if(progress>=a.t&&progress<=b.t){
          var local=(progress-a.t)/(b.t-a.t);
          return a.v+(b.v-a.v)*ease(local);
        }
      }
      return 50;
    }
    function tick(ts){
      if(!start)start=ts;
      var p=Math.min((ts-start)/dur,1);
      current=target=interp(p);
      applyPos(current);
      if(p<1){requestAnimationFrame(tick);}
      else{target=50;current=50;applyPos(50);startBreathe();}
    }
    requestAnimationFrame(tick);
  }

  if(window.IntersectionObserver){
    var sweepObs=new IntersectionObserver(function(es){
      if(es[0].isIntersecting){runSweep();sweepObs.disconnect();}
    },{threshold:.5});
    sweepObs.observe(slider);
  }else{runSweep();}

  /* Drag */
  slider.addEventListener("mousedown",function(e){
    dragging=true;stopHint();setTarget(posFromEvent(e));e.preventDefault();
  });
  slider.addEventListener("touchstart",function(e){
    dragging=true;stopHint();setTarget(posFromEvent(e));
  },{passive:true});
  addEventListener("mousemove",function(e){if(dragging)setTarget(posFromEvent(e));});
  addEventListener("touchmove",function(e){if(dragging)setTarget(posFromEvent(e));},{passive:true});
  addEventListener("mouseup",function(){dragging=false;});
  addEventListener("touchend",function(){dragging=false;});

  /* Keyboard */
  handle.addEventListener("keydown",function(e){
    if(e.key==="ArrowLeft"){stopHint();setTarget(target-2);e.preventDefault();}
    else if(e.key==="ArrowRight"){stopHint();setTarget(target+2);e.preventDefault();}
  });

  applyPos(80);
})();

/* Video autoplay via IntersectionObserver — safe play/pause with catch */
(function(){
  var videos=Array.from(mas.querySelectorAll("video"));
  if(!videos.length)return;
  function safePlay(v){
    if(v.paused)v.play().catch(function(){});
  }
  function safePause(v){
    if(!v.paused)v.pause();
  }
  var vObs=window.IntersectionObserver?new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting)safePlay(e.target);
      else safePause(e.target);
    });
  },{threshold:.1}):null;

  videos.forEach(function(v){
    v.muted=true;v.loop=true;v.playsInline=true;v.preload="auto";
    /* Wait until browser has enough data, then hand off to observer */
    function onReady(){
      v.removeEventListener("canplay",onReady);
      if(vObs){vObs.observe(v);}
      else{safePlay(v);}
    }
    if(v.readyState>=3){onReady();}
    else{v.addEventListener("canplay",onReady);}
  });

  document.addEventListener("visibilitychange",function(){
    videos.forEach(function(v){
      if(document.hidden)safePause(v);
      else if(v.closest(".it:not([hidden])"))safePlay(v);
    });
  });
})();
var portrait=$(".about-portrait");
if(portrait&&!matchMedia("(hover:none)").matches&&!motionPreference.matches){
  portrait.addEventListener("mousemove",function(e){
    var r=portrait.getBoundingClientRect();
    var x=((e.clientX-r.left)/r.width-.5)*2;
    var y=((e.clientY-r.top)/r.height-.5)*2;
    portrait.style.transform="perspective(700px) rotateY("+x*8+"deg) rotateX("+(-y*6)+"deg) scale(1.02)";
  });
  portrait.addEventListener("mouseleave",function(){
    portrait.style.transform="";
  });
}
