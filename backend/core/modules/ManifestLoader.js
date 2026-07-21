/*
|--------------------------------------------------------------------------
| ERP Platform - Manifest Loader
|--------------------------------------------------------------------------
|
| Responsible for loading installed module manifests.
|
*/


import manifestRegistry from "./ManifestRegistry.js";


import accountingManifest from "./accounting/manifest.js";





class ManifestLoader {


  constructor() {

    this.loaded = [];

  }





  loadAll() {


    const manifests = [


      accountingManifest


    ];



    manifests.forEach((manifest)=>{


      manifestRegistry.register(manifest);


      this.loaded.push(
        manifest.id
      );


    });



    return this.loaded;


  }





  summary() {


    return {

      total:
        this.loaded.length,


      modules:
        this.loaded

    };


  }



}



const manifestLoader =
  new ManifestLoader();



export default manifestLoader;