   "use strict";

   // name: main  
   // params: none;
   // functions: creates a main thread like c++ or java
   // returns: none;

   function main() {

     // check for cookies... if first time user then instruct on scroll
     // regex looks fro visited = 0 in the string if it is the first time someone has been here

/*     if(document.cookie.indexOf('visited=no') != -1) {
          document.getElementById('scroll_instructions').style.display = 'block';
     }
*/
     // private //

     var local_settings = {
            model : {
               index : 0,
            }, 
     };
     
      var set_up = new _brain_set_up();

      set_up.init( {
         scene : new THREE.Scene(), // sets a new three scene in the init
         renderer : new THREE.WebGLRenderer( {alpha : true, antialias: true }), // sets up a new web gl renderer
         camera : new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 1000 ), // sets up a camera
      } )
 
      set_up.create_scene();

      set_up.animate();
      
      events.add(document.getElementById('hamburger'), 'click', function(e) {
          var event = e || window.event;         
          set_up.event_reciever('bring content in focus', event);

      });
/*      
      events.add(window, 'touchmove', function(e) { 
           var event = e || window.event;           
           set_up.event_reciever('mouse_position', { x: event.touches[0].clientX, y: event.touches[0].clientY });
           set_up.event_reciever('bring content in focus', event);
      });
*/      
      events.add(window, 'resize', function() {
          set_up.get_setting('renderer').setSize(window.innerWidth, window.innerHeight);    
          set_up.get_setting('camera').aspect = window.innerWidth / window.innerHeight;
          set_up.get_setting('camera').updateProjectionMatrix();
          set_up.event_reciever('resize_viewport', window.innerWidth / window.innerHeight);     
      } );
   
   }


   events.add(window, 'load', main);