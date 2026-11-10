(function(){
  var root=document.documentElement,
      themeKey="glam-by-merc-theme",
      media=window.matchMedia("(prefers-color-scheme: dark)"),
      theme;
  try{
    theme=localStorage.getItem(themeKey);
  }catch(error){
    console.warn("Theme preference could not be read; using the system setting.",error);
  }
  var hasSavedTheme=theme==="light"||theme==="dark";

  function applyTheme(value){
    root.dataset.theme=value;
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.content=value==="dark"?"#1e0f16":"#a3203f";
    document.querySelectorAll("[data-theme-choice]").forEach(function(button){
      button.setAttribute("aria-pressed",button.dataset.themeChoice===value?"true":"false");
    });
  }

  applyTheme(hasSavedTheme?theme:(media.matches?"dark":"light"));

  document.addEventListener("DOMContentLoaded",function(){
    applyTheme(root.dataset.theme);
    document.querySelectorAll("[data-theme-choice]").forEach(function(button){
      button.addEventListener("click",function(){
        var value=button.dataset.themeChoice;
        hasSavedTheme=true;
        applyTheme(value);
        try{
          localStorage.setItem(themeKey,value);
        }catch(error){
          console.warn("Theme preference could not be saved.",error);
        }
      });
    });
  });

  media.addEventListener("change",function(event){
    if(!hasSavedTheme)applyTheme(event.matches?"dark":"light");
  });
})();
