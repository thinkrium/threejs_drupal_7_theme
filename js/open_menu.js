
var events = {

    // create a cross browser event listener
    // addEvent
    // params: element is the element listening for the event
    // params: event is the event the element is listening for
    // params: funct is the callback function
    // functions : listens for an event appropriately and sends attachEvent to the proper listner
    //              and addeventlistner to the proper listener
    // returns:   nothing

    add : function(element, event, funct) {
       if(element.addEventListener) {
          element.addEventListener(event, funct);
       }
       else if(element.attachEvent) {
          element.attachEvent('on'+event, funct);
       }
    }
}

function main() {
   
   var hamburger = document.getElementById('hamburger');
   var menu = document.getElementById('sub_page_main_navigation');

   events.add(hamburger, 'click', function(e) {
       
       open_menu(e, hamburger, menu);
   });
}

function open_menu(e, h, m) {
   var event = e || window.event;

    if(h.className == 'open') {
      h.className = '';
      m.className = '';
    }
    else {
      h.className = 'open';
      m.className = 'open';
    }   
}

events.add(window, 'load', main);