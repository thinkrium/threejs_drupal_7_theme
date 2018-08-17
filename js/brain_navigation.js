// navigation page
// this is the object that holds the page navigation functionality

var navigation = function() {
   

   ///////////////////////////////////////////
   /////////private///////////////////////////
   ///////////////////////////////////////////

   // set the parent functionality
   var parent = new super_brain();

   var closed_object = this;

//   var navigation_style = document.getElementById('main_navigation').currentStyle || //window.getComputedStyle(document.getElementById('main_navigation'));

   var local_settings =  {
       interval : '',
//       scroll_height : Number(navigation_style.marginTop.split('px')[0]),       
       main_menu : document.getElementsByClassName('region-main-navigation')[0],
       main_menu_container : document.getElementById('main_navigation'),
       scroll_state : 'closed',
       scroll_position : 0,
   };

   

 
   ///////////////////////////////////////////
   //////////public///////////////////////////
   ///////////////////////////////////////////

   // name : open_main_navigation 
   // params : nav_element is the main navigation element looking for the class name open
   // functions : toggles the classname open
   // returns : nothing
   this.open_main_navigation = function(nav_element) {

     closed_object.startRAF();

/*   
     if(nav_element.className == "open") {        
        nav_element.className = '';        
     }
     else {            
        nav_element.className = 'open';        
     } 
*/
       
   }

   // name   : startRAF
   // params : none
   // functions is the animation frame so that you can interrupt it and reset it when necessary
   // returns : none;
   this.startRAF = function() {
//     local_settings.interval = window.requestAnimationFrame(closed_object.startRAF);
//     closed_object.render_animation();
   } 

   // name : render animation
   // params: none;
   // functions : animates the loop
   // returns: nothing;
   this.render_animation = function() {

      var current_position = window.pageYOffset || local_settings.main_menu_container.scrollTop;  

      if(local_settings.scroll_state == 'closed') {
         window.scrollTo(0, local_settings.scroll_position += 4);
      }
      else {
         window.scrollTo(0, local_settings.scroll_position -= 4);
      }

       
      if(current_position <= 0 ) {
         closed_object.closeRAF(current_position);
         local_settings.scroll_position = current_position;
           
    }
    else if( current_position >= local_settings.scroll_height) {
          closed_object.closeRAF(current_position);
          local_settings.scroll_position = current_position;
      }     
   };

   // name   : startRAF
   // params : cur_pos is the current position of the element to test for
   // functions is the animation frame so that you can interrupt it and reset it when necessary
   // returns : none;
   this.closeRAF = function(cur_pos) {


           if(cur_pos <= 0) {
              local_settings.scroll_state = 'closed';
              local_settings.main_menu_container.className = '';        
              window.cancelAnimationFrame(local_settings.interval);
           } 
           else if (cur_pos >= local_settings.scroll_height) {
              local_settings.scroll_state = 'open';
              local_settings.main_menu_container.className = 'open';                      
              window.cancelAnimationFrame(local_settings.interval);
           }           

   }


   
   // name : init
   // params : none;
   // functions : sets up the local settings;
   // returns : nothing
   this.init = function() { 
//      local_settings.main_menu['size'] = document.getElementsById('block-system-main-menu').getElementsByTagName('li').length;

   }

   // name : event_reciever
   // params: event which are the event attributes
   // functions recieves the events from the main and the event manager
   // returns : nothing 
   this.event_reciever = function( action, event, dom) {
   
      // opens navigation
      if(
         event.target.id == 'hamburger' ||
         event.target.id == 'main_navigation' ||
         event.target.className == 'hamburger_bar'     
        ) {
           closed_object.open_main_navigation(dom);
      }
   };
}