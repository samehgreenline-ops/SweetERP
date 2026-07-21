/*
|--------------------------------------------------------------------------
| ERP Platform - Module Loader
|--------------------------------------------------------------------------
|
| Responsible for loading enabled ERP modules.
|
*/


import moduleManager from "./ModuleManager.js";



class ModuleLoader {



  constructor(){

    this.loadedModules = [];

  }





  loadAll(){


    const modules =
      moduleManager.getEnabled();



    this.loadedModules = modules;



    return this.loadedModules;

  }





  load(id){


    const module =
      moduleManager.get(id);



    if(!module){

      throw new Error(
        `Module '${id}' not found`
      );

    }





    if(!module.enabled){

      throw new Error(
        `Module '${id}' is disabled`
      );

    }





    const exists =
      this.loadedModules.find(
        m => m.id === id
      );



    if(!exists){

      this.loadedModules.push(module);

    }



    return module;

  }





  getLoadedModules(){

    return this.loadedModules;

  }





  isLoaded(id){

    return this.loadedModules.some(
      m => m.id === id
    );

  }





  summary(){


    return {

      total:
        this.loadedModules.length,


      modules:
        this.loadedModules.map(
          m => m.id
        )

    };


  }



}



const moduleLoader =
  new ModuleLoader();



export default moduleLoader;