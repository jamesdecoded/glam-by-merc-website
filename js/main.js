/* Glam by Mer-c: gallery, filters, photo viewer, scroll effects.
   Gallery items are listed in the "items" array below: [media key, category, caption]. */
const M={
 "i0": "assets/images/gold-coral-eyes.jpg",
 "i1": "assets/images/rose-event-glam.jpg",
 "i2": "assets/images/berry-lip-soft-glam.jpg",
 "i3": "assets/images/graduation-day.jpg",
 "i4": "assets/images/night-out.jpg",
 "i5": "assets/images/natural-glow.jpg",
 "i6": "assets/images/glossy-lip-glow.jpg",
 "i7": "assets/images/mercy-mukunda-portrait.jpg",
 "i8": "assets/images/copper-evening-glam.jpg",
 "i9": "assets/images/colorful-stage-glam.jpg",
 "i10": "assets/images/feathered-stage-glam.jpg",
 "i11": "assets/images/red-celebration-glam.jpg",
 "v0": "assets/video/reel-1.mp4",
 "v0p": "assets/images/reel-1-poster.jpg",
 "v1": "assets/video/reel-2.mp4",
 "v1p": "assets/images/reel-2-poster.jpg",
 "v2": "assets/video/reel-3.mp4",
 "v2p": "assets/images/reel-3-poster.jpg"
};
var $=function(s,r){return (r||document).querySelector(s)};

/* Resolve data-m image sources */
document.querySelectorAll("[data-m]").forEach(function(e){e.src=M[e.dataset.m]});

/* Hero slideshow */
var heroSlides=Array.from(document.querySelectorAll(".hero-slide")),heroIdx=0;
if(heroSlides.length>1){
  setInterval(function(){
    if(document.hidden)return;
    heroSlides[heroIdx].classList.remove("is-active");
    heroIdx=(heroIdx+1)%heroSlides.length;
    heroSlides[heroIdx].classList.add("is-active");
  },7000);
}

/* Gallery */
var items=[["i0","Shoots","Gold and coral eyes"],["v1","Reels","Soft glam for two"],["i6","Shoots","Glossy lip, glowing skin"],["i1","Events","Rose tones for an event"],["i3","Graduation","Graduation day"],["i11","Bridal","Bridal glam"],["i2","Bridal","Berry lip bridal look"],["v0","Reels","Event makeup, final touches"],["i8","Events","Copper evening glam"],["v2","Reels","Camera-ready groom makeup"],["i4","Events","Night out with the girls"],["i9","Shoots","Colourful stage glam"],["i5","Bridal","Natural bridal glow"],["i10","Shoots","Feathered stage glam"]];
var mas=$("#mas");
items.forEach(function(it,n){
  var v=it[0][0]==="v",b=document.createElement("button");
  b.className="it rv";b.dataset.c=it[1];b.dataset.k=it[0];
  b.style.setProperty("--rd",(n%3)*.08+"s");
  b.setAttribute("aria-label","Open: "+it[2]);
  var media=document.createElement(v?"video":"img");
  if(v){
    media.muted=true;media.loop=true;media.playsInline=true;media.autoplay=true;
    media.poster=M[it[0]+"p"]||"";
    media.setAttribute("aria-label","Behind the scenes reel");
    media.src=M[it[0]];
    if(matchMedia("(prefers-reduced-motion:reduce)").matches){media.autoplay=false;}
  }else{
    media.alt=it[2]+" makeup look";media.loading="lazy";media.src=M[it[0]];
  }
  var cap=document.createElement("figcaption");cap.textContent=it[2];
  b.appendChild(media);b.appendChild(cap);
  mas.appendChild(b);
});

/* Filter tabs */
var tabs=document.querySelectorAll(".tabs button");
tabs.forEach(function(t){t.addEventListener("click",function(){
  tabs.forEach(function(x){x.setAttribute("aria-pressed",x===t)});
  mas.querySelectorAll(".it").forEach(function(p){
    p.hidden=t.dataset.f!=="all"&&p.dataset.c!==t.dataset.f;
    if(!p.hidden)p.classList.add("in");
  });
})});

/* Lightbox */
var lb=$("#lb"),lbm=$("#lbm"),closeButton=$("#x"),last,bodyOverflow;
function open_(k,btn){
  last=btn;var v=k[0]==="v",e=document.createElement(v?"video":"img");
  e.className="m";e.src=M[k];
  if(v){e.controls=true;e.autoplay=true;e.loop=true;e.muted=true;e.playsInline=true;}
  else{e.alt="Enlarged makeup look";}
  lbm.innerHTML="";lbm.appendChild(e);
  lb.inert=false;lb.setAttribute("aria-hidden","false");lb.classList.add("o");
  bodyOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
  closeButton.focus();
}
function close_(){
  lb.classList.remove("o");lb.setAttribute("aria-hidden","true");lb.inert=true;
  lbm.innerHTML="";document.body.style.overflow=bodyOverflow||"";
  if(last)last.focus();
}
mas.addEventListener("click",function(e){var b=e.target.closest(".it");if(b)open_(b.dataset.k,b)});
closeButton.onclick=close_;
lb.addEventListener("click",function(e){if(e.target===lb)close_()});
document.addEventListener("keydown",function(e){
  if(!lb.classList.contains("o"))return;
  if(e.key==="Escape"){close_();return;}
  if(e.key==="Tab"){
    var focusable=[closeButton].concat(Array.from(lbm.querySelectorAll("video,[href],button,[tabindex]:not([tabindex='-1'])"))),
        first=focusable[0],lastF=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastF.focus();}
    else if(!e.shiftKey&&document.activeElement===lastF){e.preventDefault();first.focus();}
  }
});

/* Marquee — use DOM to avoid injection */
var words=["Bridal","Events","Photo shoots","Graduations","Glam by Mer-c"],mt=$("#mt");
for(var r=0;r<4;r++)words.forEach(function(w){var s=document.createElement("span");s.textContent=w;mt.appendChild(s);});

/* Scroll-reveal */
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;
  e.target.classList.add("in");io.unobserve(e.target);
})},{threshold:.12,rootMargin:"0px 0px -40px 0px"}):null;
document.querySelectorAll(".rv").forEach(function(e){io?io.observe(e):e.classList.add("in")});

/* Hamburger / drawer */
var burger=$("#nav-burger"),drawer=$("#nav-drawer"),overlay=$("#nav-overlay");
var menuView=$("#nav-menu-main"),themeView=$("#nav-theme-view"),themeOpen=$("#nav-theme-open"),themeBack=$("#nav-theme-back");
function showMenuView(){
  themeView.hidden=true;menuView.hidden=false;themeOpen.setAttribute("aria-expanded","false");
}
function showThemeView(){
  menuView.hidden=true;themeView.hidden=false;themeOpen.setAttribute("aria-expanded","true");
  themeBack.focus();
}
function openDrawer(){
  showMenuView();
  drawer.classList.add("is-open");overlay.classList.add("is-open");
  drawer.inert=false;drawer.setAttribute("aria-hidden","false");
  burger.setAttribute("aria-expanded","true");
  document.body.style.overflow="hidden";
  $("#nav-drawer-close").focus();
}
function closeDrawer(){
  showMenuView();
  drawer.classList.remove("is-open");overlay.classList.remove("is-open");
  drawer.inert=true;drawer.setAttribute("aria-hidden","true");
  burger.setAttribute("aria-expanded","false");
  document.body.style.overflow="";
  burger.focus();
}
burger.addEventListener("click",openDrawer);
$("#nav-drawer-close").addEventListener("click",closeDrawer);
themeOpen.addEventListener("click",showThemeView);
themeBack.addEventListener("click",function(){showMenuView();themeOpen.focus()});
overlay.addEventListener("click",closeDrawer);
drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeDrawer)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&drawer.classList.contains("is-open"))closeDrawer()});

/* Nav scroll border */
var tick=false,nav=$("#nav");
addEventListener("scroll",function(){
  if(tick)return;tick=true;
  requestAnimationFrame(function(){nav.classList.toggle("s",scrollY>10);tick=false});
},{passive:true});

/* Scroll-to-top */
var scrollTopBtn=$("#scroll-top");
addEventListener("scroll",function(){
  var show=scrollY>600;
  scrollTopBtn.hidden=!show;
  scrollTopBtn.classList.toggle("is-visible",show);
},{passive:true});
scrollTopBtn.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});

/* Floating WhatsApp button — hide while hero or work section is visible */
var wa=$(".wa"),hero=$(".hero");
if(window.IntersectionObserver){
  var visibleSections=new Set(),
      waObserver=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting)visibleSections.add(e.target);else visibleSections.delete(e.target)});
        wa.classList.toggle("is-hidden",visibleSections.size>0);
      },{threshold:.1});
  waObserver.observe(hero);
  waObserver.observe($("#work"));
}

/* Scroll-spy — highlight active nav link */
var navAnchors=Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
var spySections=navAnchors.map(function(a){return document.querySelector(a.getAttribute("href"));}).filter(Boolean);
function updateSpy(){
  var scrollY=window.scrollY+80,active=null;
  for(var i=spySections.length-1;i>=0;i--){
    if(spySections[i].getBoundingClientRect().top+window.scrollY<=scrollY){active=spySections[i];break;}
  }
  navAnchors.forEach(function(a){
    a.classList.toggle("active",active&&a.getAttribute("href")==="#"+active.id);
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
