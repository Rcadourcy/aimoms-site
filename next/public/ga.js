// Google Analytics 4. The cookie banner loads this file only after a visitor accepts cookies.
(function(){
  var ID='G-0X6250FLJ3';
  if(!ID||window._gaLoaded) return;
  window._gaLoaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('js',new Date());
  gtag('config',ID);
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(s);
  var bought={'/experience-thank-you':'In-Person Experience','/off-your-plate-thank-you':'Top 3 Session','/build-aime-thank-you':'Build Aime'}[location.pathname.replace(/\.html$/,'')];
  if(bought) gtag('event','purchase',{content_name:bought});
})();
