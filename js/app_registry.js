if('serviceWorker' in navigator) {
   navigator.serviceWorker
     .register('sites/all/themes/brain/js/service_worker.js', { scope : 'sites/all/themes/brain/js/'})
     .then(function(registration) { /*console.log ('For the win!', registration ) ; */})
     .catch(function (err) {
//        console.log('boo', err);    
     } );
     
 }

