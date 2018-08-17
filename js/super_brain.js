var super_brain = function() {
   
    //////////////////////////////////////////////////////////////
    // private --
    //////////////////////////////////////////////////////////////

    // settings
    // holds the settings that can be dynamically created in each sub module
    var settings = {};

     
    //////////////////////////////////////////////////////////////
    // public --
    //////////////////////////////////////////////////////////////

    // set_setting
    // params: name holds the title of the value that will be dynamically set in the super class
    // params: value holds the value of the dynamically allocated value in the super class
    // functions : sets a value in the settings object
    // returns nothing;
    this.set_setting = function(name, value) {
       settings[name] = value;
    }

    // get_setting
    // params: name holds the title of the value that will be dynamically set in the super class
    // functions : gets a value in the settings object
    // returns the value of the setting named in the parameter;
    this.get_setting = function(name) {
      return settings[name];
    }

    // get_all_settings
    // functions : gets the settings object
    // returns the whole setting object;
    this.get_all_settings = function() {
      return settings;
    }

   // name   : event_reciever
   // params : settings  is a json object with its settings that modify the current scenario
   // functions : takes in settings to adjust the current local settings
   // returns : nothing
   this.event_reciever = function(classification, settings) {
        settings[classification] = settings;
   }
}