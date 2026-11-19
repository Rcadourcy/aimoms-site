// Google Analytics 4. The cookie banner loads this file only after a visitor accepts cookies.
(function(){
  var ID='G-0X6250FLJ3';
  if(!ID||window._gaLoaded) return;
  window._gaLoaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('js',new Date());
  // Hero A/B test: tag every visitor with their homepage hero version (a = old copy, b = Your entry into AI)
  var hv=(document.cookie.match(/(?:^|; )aim_hero=([ab])/)||[])[1];
  if(hv) gtag('set','user_properties',{hero_variant:hv});
  gtag('config',ID);
  if(hv&&document.documentElement.getAttribute('data-hero')) gtag('event','hero_view',{hero_variant:hv});
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(s);
  var bought={'/experience-thank-you':{name:'In-Person Experience',value:265},'/off-your-plate-thank-you':{name:'Top 3 Session',value:500},'/build-aime-thank-you':{name:'Build Aime',value:97},'/prompt-library-thank-you':{name:'Prompt Library',value:27}}[location.pathname.replace(/\.html$/,'')]||window._gaPurchase;
  if(bought){
    var sale={content_name:bought.name,value:bought.value,currency:'USD'};
    var sid=new URLSearchParams(location.search).get('session_id');
    if(sid) sale.transaction_id=sid;
    gtag('event','purchase',sale);
  }
})();
