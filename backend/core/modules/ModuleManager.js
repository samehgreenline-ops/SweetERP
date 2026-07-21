/*
|--------------------------------------------------------------------------
| ERP Platform - Module Manager
|--------------------------------------------------------------------------
|
| Uses the central Module Registry.
|
*/


import {
  moduleRegistry,
  getModule
} from "./index.js";



class ModuleManager {



  getAll(){

    return moduleRegistry;

  }





  get(id){

    return getModule(id);

  }





  getEnabled(){

    return moduleRegistry.filter(
      module => module.enabled
    );

  }





  enable(id){


    const module =
      getModule(id);



    if(module){

      module.enabled = true;

    }


    return module;

  }





  disable(id){


    const module =
      getModule(id);



    if(module){

      module.enabled = false;

    }


    return module;

  }





  isEnabled(id){


    const module =
      getModule(id);



    return !!module && module.enabled;

  }



}



const moduleManager =
  new ModuleManager();



export default moduleManager;