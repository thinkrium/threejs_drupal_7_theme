<?php

   // globals
   global $base_url;
   global $user;

   
?>


 <main id="sub_page_main_content"> 

      <div id="hamburger">
         <span className = "hamburger_bar"></span>
         <span className = "hamburger_bar"></span> 
      </div>

      <nav id="sub_page_main_navigation">
         <?php print render($page['main_navigation']); ?>
      </nav>

     

<section >
   <?php 
      // globals
      global $base_url;
      print $messages;
//      print $breadcrumb;


      print render($action_links);
  
  print render($tabs); 
  print render($page['content']); ?>
</section>

</main>
