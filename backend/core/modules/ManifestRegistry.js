/*
|--------------------------------------------------------------------------
| ERP Platform - Manifest Registry
|--------------------------------------------------------------------------
|
| Central registry for module manifests.
|
| The platform will use this registry to discover:
| - menus
| - permissions
| - routes
| - reports
|
*/


class ManifestRegistry {


  constructor() {

    this.manifests = [];

  }





  register(manifest) {


    if (!manifest.id) {

      throw new Error(
        "Manifest id is required"
      );

    }



    const exists =
      this.manifests.find(
        item => item.id === manifest.id
      );



    if (exists) {

      throw new Error(
        `Manifest '${manifest.id}' already registered`
      );

    }



    this.manifests.push(manifest);



    return manifest;

  }





  get(id) {


    return this.manifests.find(
      manifest => manifest.id === id
    );


  }





  getAll() {

    return this.manifests;

  }





  getPermissions() {


    return this.manifests.flatMap(
      manifest =>
        manifest.permissions || []
    );


  }





  getMenus() {


    return this.manifests.flatMap(
      manifest =>
        manifest.menus || []
    );


  }





  getRoutes() {


    return this.manifests.flatMap(
      manifest =>
        manifest.routes || []
    );


  }





  getReports() {


    return this.manifests.flatMap(
      manifest =>
        manifest.reports || []
    );


  }



}



const manifestRegistry =
  new ManifestRegistry();



export default manifestRegistry;