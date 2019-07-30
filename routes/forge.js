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

String.prototype.toBase64 = function () {
  return new Buffer(this).toString('base64');
};

const path = require('path');
const fs = require('fs');
const express = require('express');
const { AuthenticationClient, DataManagementClient, ModelDerivativeClient } = require('forge-nodejs-utils');

const config = require('../config');

let router = express.Router();
let auth = new AuthenticationClient(config.credentials.client_id, config.credentials.client_secret);
let data = new DataManagementClient(config.credentials);
let deriv = new ModelDerivativeClient(config.credentials);

router.get('/forge/oauth/token', async function (req, res) {
  const token = await auth.authenticate(config.scopePublic.split(' '));
  res.json({
    access_token: token.access_token,
    expires_in: token.expires_in
  });
});

router.get('/forge/models', async function (req, res) {
  let results = [];
  const buckets = await data.listBuckets();
  for (const bucket of buckets) {
    if (bucket.bucketKey === config.bucket) {
      const objects = await data.listObjects(bucket.bucketKey);
      for (const obj of objects) {
        results.push({
          id: obj.objectKey.split('.')[0],
          label: obj.objectKey,
          urn: obj.objectId.toBase64()
        });
      }
    }
  }
  res.json(results);
});

router.get('/forge/initialsetup', async function (req, res) {
  const buff = fs.readFileSync(path.join(__dirname, '..', 'samples', 'rac_advanced_sample_project.rvt'));
  const obj = await data.uploadObject(config.bucket, 'racadvanced.rvt', 'application/octet-stream', buff);
  const job = await deriv.submitJob(obj.objectId.toBase64(), [{ type: 'svf', views: ['2d', '3d'] }]);
  res.json(job);
});

module.exports = router;
