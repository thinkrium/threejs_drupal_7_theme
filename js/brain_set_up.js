//
// _brain_set_up will hold the three.js setup functionality
//

function _brain_set_up() {

     /////////////////////////////////////////
     // private
     /////////////////////////////////////////
     var parent = new super_brain();  
      
     var closed_object = this;   // holds the closure object
 
   var local_settings = {   
      
      viewportRatio : window.innerWidth / window.innerHeight,                                              
      // more will be dynamically populated for use in the current object scope 
      vector_direction : {x:-45, y: 270, z: 0 },
      vector_direction_near : {x: 0, y: 350, z: 1 },
      cameraDistance : {  x : 190, y : 350, z : 700 },
      cameraNearDistance : {  x : 0, y : 270, z : 0, rotation: -180 },
      navigation : document.getElementById('main_navigation'),       
      hamburger : document.getElementById('hamburger'),       
      region_navigation : document.getElementsByClassName('region-main-navigation')[0],       
      share_icon : document.getElementById('share'),
      logo_icon : document.getElementById('logo'),
      // menu_ position array starts with 0 because this is the initial starting position nd the shift function
      // will remove this first always leaving at least 1 index left in the array
      menu_position : [0],

      // this portion has to do with the loading state or the xhr.loaded variable if you add them up
      // each individual load this is the total
      site_load_total : 1675836,

      loading_status : document.getElementById('load_status'),
      loading_progress : document.getElementById('loading_progress'),
      
      // scrolling percentage starts with a timer it is initiated for checking with a 0
      start_time: 0,
      zoom_duration : 1000,
      scrolling_percentage : 0,
      
      menu_open : false,

      is_front : '',
   }


    // create the camera distance
    var distance = { 
           x: local_settings.cameraDistance.x - local_settings.cameraNearDistance.x,
           y: local_settings.cameraDistance.y - local_settings.cameraNearDistance.y, 
           z: local_settings.cameraDistance.z - local_settings.cameraNearDistance.z
    };

     // create the look at vector for rotating the camera
     var look_at_vector_distance = {
           x: local_settings.vector_direction.x - local_settings.vector_direction_near.x,
           y: local_settings.vector_direction.y - local_settings.vector_direction_near.y,
           z: local_settings.vector_direction.z - local_settings.vector_direction_near.z,
      }

   //helper function
   function progressBar( xhr ) {
       // to figure out how to find total when file is gzipped xhr out the .total attribute and 
       // the last number from the .loaded will be the total
       var loaded = (xhr.loaded / local_settings.site_load_total) * 100;
       local_settings.loading_status.style.width = loaded + '%';
       
   }   
   
   /////////////////////////////////////////
   // public
   /////////////////////////////////////////
  
   //name : init 
   //params: settings is a json object to set variables in the init_function
   //functions : sets up the initial variables when necessary
   // returns: nothing;
   this.init = function(settings = NULL) {
      if(typeof settings['scene'] != 'undefined') {
          parent.set_setting('scene', settings['scene']);
      }

      if(typeof settings['camera'] != 'undefined') {
          parent.set_setting('camera', settings['camera']);
      }

      if(typeof settings['renderer'] != 'undefined') {
          parent.set_setting('renderer', settings['renderer']);          
          parent.get_setting('renderer').setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(parent.get_setting('renderer').domElement);
      }        
      
        
       if(document.body.className.match('not-front')) {
         local_settings.is_front = false;
//         local_settings.cameraDistance.z *= 1.5;

       }       
       else  {
         local_settings.is_front = true;
       }       

   }

   // name      : choose_direction
   // params    : none
   // functions : looks at the current location and adjusts the menu direction
   // returns   : none;
   this.choose_direction = function() {
    
   }

   // name : add
   // params: name holds the name of the object
   // params: value holds the value and type of object that is set
   // function : sets object for the scene
   // returns: nothing
   this.add = function(name,value) {                                                        
          parent.set_setting(name, value);              
   }

   // name : degtorad
   // params: degrees
   // functions translates degrees to radians
   // return : radians 
   this.degtorad = function (degrees) {
      return degrees * (Math.PI / 180);
   }
   
   // name : create_camera_distance_percentages
   // params : none
   // functions: uses camera distance and camera distance near to create and return a moving distance percentage
   // returns : a json object of moving camera distance
   this.create_camera_distance = function() {

       local_settings.scrolling_percentage = 0;




       if( Date.now() <= (local_settings.start_time + local_settings.zoom_duration) ) {  // zoom duration    
           if(local_settings.menu_open) {  
               local_settings.scrolling_percentage = (Date.now() - local_settings.start_time) / local_settings.zoom_duration;
           }
           else {
               local_settings.scrolling_percentage = 1 - (Date.now() - local_settings.start_time) / local_settings.zoom_duration;           
           }
       }
       else {
           local_settings.start_time = 0;
       }  

      var moving_distance = {
         x : local_settings.cameraDistance.x - (distance.x * local_settings.scrolling_percentage),
         y : local_settings.cameraDistance.y - (distance.y * local_settings.scrolling_percentage),
         z : local_settings.cameraDistance.z - (distance.z * local_settings.scrolling_percentage),
      };

      var moving_rotation = {
         x : local_settings.vector_direction.x - (look_at_vector_distance.x * local_settings.scrolling_percentage),
         y : local_settings.vector_direction.y - (look_at_vector_distance.y * local_settings.scrolling_percentage),
         z : local_settings.vector_direction.z - (look_at_vector_distance.z * local_settings.scrolling_percentage),
      };


      var transform = {
          x : moving_distance.x,
          y : moving_distance.y,
          z : moving_distance.z,
          r_x : moving_rotation.x,
          r_y : moving_rotation.y,
          r_z : moving_rotation.z,
          
          // m_r_y is model rotation on the y axis
          m_r_y : local_settings.cameraNearDistance.rotation * local_settings.scrolling_percentage,
     }      

      return transform;
   }
   
   // name: log_settings
   // params: name  defaults to null;
   // functions: if name is null calls parent to get all settings else returns the named value;
   // returns all the parents settings 
   this.get_setting = function(name = null) {
      return ( name == null ) ?  parent.get_all_settings() : parent.get_all_settings()[name];
   }  
   
   // name : add_to_scene
   // params: name is the name of the value of the three setting
   // functions: adds the named setting to the scene
   // returns: nothing
   this.add_to_scene = function(name) {

      this.get_setting('scene').add( this.get_setting(name) );
   }
   
   // name      : vertex_buffer_set_up
   // params    : none 
   // functions : creates the buffer to adjust in the vshader 
   // returns   : nothing
   this.vertex_buffer_set_up = function() {   
      
      this.add('manager', new THREE.LoadingManager());
      
      // add a json loading manager to animate
      this.add('loader', new THREE.FBXLoader(
           closed_object.get_setting('manager') 
      ) );

      // this function will get called every progress iteration
      this.get_setting('manager').onLoad = function( url, itemsLoaded, itemsTotal) {

          local_settings.loading_progress.style.display = "none";       
          closed_object.get_setting('current_action').reset();
      }   
     
     
         this.get_setting('loader').load('sites/all/themes/brain/models/sitespace2.fbx', function(model) {

            /// this is the animated skinnedmesh
            model.children[1].material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
            model.children[1].material.skinning = true;



            // this is the ground
            model.children[0].material = new THREE.MeshLambertMaterial({ color: 0x5555fe });
            model.children[0].receiveShadow = true;
            model.children[0].castShadow = true;


                        
            if(!local_settings.is_front) {
               model.scale.set(.5, .5, .5);
            }
            
            closed_object.add('mixer', new THREE.AnimationMixer( model) );


            closed_object.add('thinking', closed_object.get_setting("mixer").clipAction(model.animations[4]) );      
            closed_object.add('dancing', closed_object.get_setting("mixer").clipAction(model.animations[6]) );        
        
        
           if(local_settings.is_front) {
                closed_object.add('current_action', closed_object.get_setting('dancing') );
            }
            else {
                closed_object.add('current_action', closed_object.get_setting('thinking') );
            
            }
            closed_object.get_setting('scene').add(model);
            
            closed_object.get_setting('current_action').play(); 

      }, progressBar );
     
   }
   
   
   // name : select_action
   // params: direction is a string either. up or down
   // functions : looks at the current state of the content and
   //             changes the action to the thinking if moving up it goes back o walking
   // returns : nothing
   this.select_action = function(direction) {

          if(direction == 'dancing') {
             
               closed_object.get_setting('current_action').crossFadeTo(
                   closed_object.get_setting('dancing'), 
                   1
                );

                closed_object.add('current_action', closed_object.get_setting('dancing'));
          }
          else {

               closed_object.get_setting('current_action').crossFadeTo(
               closed_object.get_setting('thinking'), 
               1
               );

               closed_object.add('current_action', closed_object.get_setting('thinking'));

          }

          closed_object.get_setting('current_action').reset();

          closed_object.get_setting('current_action').play();


   }
 

   // name : create_scene
   // params: none;
   // function : creates all the loaded objects and geometries not already in the scene
   // returns : nothing
   this.create_scene = function() {      
      
      this.add('ambient_light', new THREE.AmbientLight( 0xffffff ) );
             
      this.add('visible_mesh_geometry', new THREE.BufferGeometry());
      

      this.add('spot_light_red', new THREE.SpotLight( 0xffffff, .15 ) );
      this.get_setting('spot_light_red').position.y = 1000;
      this.get_setting('spot_light_red').position.z = 1000;
      
      this.get_setting('spot_light_red').castShadow = true;
                                     
      this.add_to_scene('spot_light_red');

      this.add_to_scene('ambient_light');

      this.add('clock', new THREE.Clock());
      
      this.get_setting('clock').start();

      // set the camera distance... originally I  was doing this based on user agent differences
      // variable holds DRY principles

      this.get_setting('camera').position.x = local_settings.cameraDistance.x;
      this.get_setting('camera').position.y = local_settings.cameraDistance.y;
      this.get_setting('camera').position.z = local_settings.cameraDistance.z;

      closed_object.get_setting('camera').lookAt(new THREE.Vector3(
                  local_settings.vector_direction.x,
                  local_settings.vector_direction.y,
                  local_settings.vector_direction.z
      ));      

      this.vertex_buffer_set_up();
   }

   // name     : rotate_model 
   // params   : none 
   // function : rotates the model front or back
   // returns  : nothing
   this.rotate_model = function() {
   

       var position = closed_object.create_camera_distance();

          if(local_settings.scrolling_percentage <= 1  && local_settings.scrolling_percentage > 0 ) { 

             closed_object.select_action('thinking');

             if (closed_object.get_setting('camera').position.z >= local_settings.cameraNearDistance.z ) {
                 closed_object.get_setting('scene').children[2].children[2].rotation.z = closed_object.degtorad(position.m_r_y);
                 closed_object.get_setting('scene').children[2].updateMatrixWorld();
                 closed_object.get_setting('camera').position.x =  position.x; 
                 closed_object.get_setting('camera').position.z =  position.z; 
                 closed_object.get_setting('camera').lookAt(new THREE.Vector3(position.r_x, position.r_y, position.r_z));
             }
        }
   }
   
 
   // name     : render
   // params   : none
   // function : defines the render for the model
   // returns  : nothing
   this.render = function() {

       // wait for the animation mixer to catch up   
       if(typeof closed_object.get_setting('mixer') != 'undefined') {

           // the docs say to pass into the mixer the delta. [new time - old time] and scale that by the mixers time scale
           // closed_object.get_setting('mixer').timeScale * closed_object.get_setting('clock').getDelta()
           closed_object.get_setting('mixer').update( closed_object.get_setting('clock').getDelta() );
       } 

       closed_object.get_setting('renderer').render(
           closed_object.get_setting('scene'),
           closed_object.get_setting('camera'),
       );
       

   }
   
   // name    : change_icon_color 
   // params  : none;
   // functions : checks menu position and if it is higher than the element add the blue class to the the element
   // returns: nothin
   this.change_icon_color = function() {

        if(!local_settings.menu_open) {
           local_settings.menu_open = true;
 
           window.setTimeout(function() {
             if(local_settings.menu_open) {
//                 local_settings.share_icon.className = 'blue';          
                 local_settings.navigation.className = 'open';
                 local_settings.hamburger.className = 'open';
             }     
           }, local_settings.zoom_duration);
           
        }
        else {
           local_settings.menu_open = false;
//           local_settings.share_icon.className = '';
           local_settings.navigation.className = '';
           local_settings.hamburger.className = '';
        }
   }
    

   // name : animate
   // params: none;
   // function: calls the looping animation sequence where rendering takes place
   // returns nothing 
   this.animate = function() {

       requestAnimationFrame(function() {
          closed_object.animate();               // calls a frame reliable function
          
       });

       closed_object.rotate_model();
       
       closed_object.render();
    }   

   // name   : event_reciever
   // params : settings  is a json object with its settings that modify the current scenario
   // functions : takes in settings to adjust the current local settings
   // returns : nothing
   this.event_reciever = function(classification, settings) {
         
      if(classification == 'mouse_position') {
      
         var vector = new THREE.Vector3();

         vector.set(
           ( settings.x / window.innerWidth ) * 2 - 1,
         - ( settings.y / window.innerHeight ) * 2 + 1,
           0.5 );

         vector.unproject( closed_object.get_setting("camera") );

         var dir = vector.sub( closed_object.get_setting("camera").position ).normalize();

         var distance = -  closed_object.get_setting("camera").position.z / dir.z;

         var pos =  closed_object.get_setting("camera").position.clone().add( dir.multiplyScalar( distance ) );
      }
      else if(classification == 'bring content in focus') {
        
        
        closed_object.change_icon_color();
     
        // set the start time for the rotation and zoom of the camera
        local_settings.start_time = Date.now();
      }
    

   }      
}