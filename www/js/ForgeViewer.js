/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

// This file is based on the tutorial
// https://developer.autodesk.com/en/docs/viewer/v2/tutorials/basic-viewer/

var viewer;

function showModel(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {

  // A document contains references to 3D and 2D viewables.
  var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
    'type': 'geometry'
  }, true);
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the avialble viewables
  var initialViewable = viewables[0];
  var svfUrl = doc.getViewablePath(initialViewable);
  var modelOptions = {
    sharedPropertyDbPath: doc.getPropertyDbPath()
  };

  var viewerDiv = document.getElementById('forgeViewer');
  viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, {});
  viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

function onDocumentLoadFailure(viewerErrorCode) {}

function onLoadModelSuccess(model) {}


function onLoadModelError(viewerErrorCode) {}