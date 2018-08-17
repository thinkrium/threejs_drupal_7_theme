<?php

   // globals
   global $base_url;
   global $user;
  
 
?>

<div id="loading_progress">
   <h1>The Thinkrium</h1>
   <div id="progress_bar">
      <div id="load_status"></div>
   </div>
</div>
<?php
   if(!isset($_COOKIE['visited'])) {
      setcookie("visited", 'no', time()  + (86400 * 30), "/");
   }
   else {
      setcookie("visited", 'yes', time() + (86400 * 30), "/");
   }
?>

<main >

<!--
      <div id='share'>
        <a href="<?php print $base_url ?>/sharables">
           <img src="sites/all/themes/brain/images/share_icon.png" title="Share the Thinkrium with those around you" alt = "Share the Thinkrium with those around you"/>
           <img src="sites/all/themes/brain/images/share_icon_blue.png" title="Share the Thinkrium with those around you" alt = "Share the Thinkrium with those around you"/>
        </a>
      </div>

-->

      <div id="hamburger">
         <span className = "hamburger_bar"></span>
         <span className = "hamburger_bar"></span> 
      </div>

      <nav id="main_navigation">
         <?php print render($page['main_navigation']); ?>
      </nav>

     <section>
<div id="hidden_content">

   <?php
      print $messages;

      print render($action_links);

      
      print render($page['content']); 
   ?> 
</div>

     <section>
</main>