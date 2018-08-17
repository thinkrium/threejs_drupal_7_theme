<?php 


   function brain_preprocess_page($vars) {

      $url = drupal_get_path_alias(current_path());
      
      $needle = "our-thoughts/";
      
       if(is_numeric(strpos($url, $needle ))){
           
           drupal_add_css('sites/all/themes/brain/css/thoughts.css');
       }

   }
