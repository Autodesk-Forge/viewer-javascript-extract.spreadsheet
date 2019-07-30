# viewer-javascript-extract.spreadsheet
JavaScript sample to extract Revit files from [Model Derivative API](https://developer.autodesk.com/en/docs/model-derivative/v2) as Spreadsheet (Excel XLSX)


[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)
[![Model-Derivative](https://img.shields.io/badge/Model%20Derivative-v2-green.svg)](http://developer.autodesk.com/)

# Description

This sample uses Model Derivative API endpoints to read a Revit project properties and create a XLSX Excel file with one sheet for each type/category with all objects on it. Non-Revit files are not supported (different structure). [Here is another version](https://github.com/Autodesk-Forge/model.derivative-csharp-context.menu) for desktop.

![thumbnail](/thumbnail.png)

## Demonstration

Run it live at [this page](https://viewerxls.herokuapp.com), or locally by following these steps:

- create a Forge application if you don't have one yet ([tutorial](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app/))
- make sure you have at least one file prepared for viewing ([tutorial](https://forge.autodesk.com/en/docs/model-derivative/v2/tutorials/prepare-file-for-viewer))
- clone this git repository
- navigate to the repository root folder and install npm dependencies
  - on Windows/macOS/Linux: `npm install`
- prepare required environment variables
  - on Windows:
    ```
    set FORGE_CLIENT_ID=<your client id>
    set FORGE_CLIENT_SECRET=<your client secret>
    set FORGE_BUCKET=<your data bucket>
    ```
  - on macOS/Linux:
    ```
    export FORGE_CLIENT_ID=<your client id>
    export FORGE_CLIENT_SECRET=<your client secret>
    export FORGE_BUCKET=<your data bucket>
    ```
- run the application
  - on Windows/macOS/Linux: `npm run dev`
- go to http://localhost:3000

# Usage

Add reference to the ForgeXLS file:

```
<script src="ForgeXLS.js"></script>
```

Then call **downloadXLSX** method passing the URN and a data:read token.

```
function downloadExcel() {
   ForgeXLS.downloadXLS(theURN, token, statusCallback /*Optional*/);
}
```

## Dependencies

This project depends on [Sheet JS](https://github.com/SheetJS/js-xlsx) to manipulate spreadsheet files. The [FileSaver](https://github.com/eligrey/FileSaver.js/) library is used to create & download a file on the client. [BlobJS](https://github.com/eligrey/Blob.js) is required for older browsers ([see compatibility](https://github.com/eligrey/FileSaver.js/#supported-browsers)). [jQuery](https://jquery.com) is also used.

```
<script src="jquery.min.js"></script>
<script src="Blob.js"></script>
<script src="FileSaver.min.js"></script>
<script src="xlsx.core.min.js"></script>
```

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.

## Written by

Augusto Goncalves [@augustomaia](https://twitter.com/augustomaia), [Forge Partner Development](http://forge.autodesk.com)
