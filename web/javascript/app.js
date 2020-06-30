'use strict';

// Node API modules
const path = require('path');

// Express modules
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// Library modules
const algorithms = require(path.join(__dirname, 'lib', 'algorithms.js'));

// Express config
const app = express();
const port = 3000;

// Express middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// Translation page
app.get(['/', '/translation', '/index', '/home'], (request, response) => {
  response.sendFile(path.join('html','index.html'), {
    root: __dirname
  });
});

// Sequence alignment page
app.get('/sequence-alignment', (request, response) => {
  response.sendFile(path.join('html','sequenceAlignment.html'), {
    root: __dirname
  });
});

// DNA to proteins route
app.post('/api/dna', (request, response) => {
  const result = algorithms.dnaToProteins(request.body.dnaStr);
  if (!result.error)
  {
    response.status(200).send({
      mrnaStr: result.mrnaStr,
      proteinStr: result.proteinStr
    });
  }
  else
  {
    response.status(500).send({
      error: result.error
    });
  }
});

// Proteins to DNA route
app.post('/api/proteins', (request, response) => {
  const result = algorithms.proteinsToDna(request.body.proteinStr);
  if (!result.error)
  {
    response.status(200).send({
      dnaStr: result.dnaStr,
      mrnaStr: result.mrnaStr
    });
  }
  else
  {
    response.status(500).send({
      error: result.error
    });
  }
});

// Edit distance route
app.post('/api/edit-distance', (request, response) => {
  const result = algorithms.editDistance(request.body.dnaStr1, request.body.dnaStr2);
  if (!result.error)
  {
    response.status(200).send({
      editDistance: result.editDistance
    });
  }
  else
  {
    response.status(500).send({
      error: result.error
    });
  }
});

// Needleman-Wunsch route
app.post('/api/needleman-wunsch', (request, response) => {
  const result = algorithms.needlemanWunsch(request.body.dnaStr1, request.body.dnaStr2);
  if (!result.error)
  {
    response.status(200).send({
      needlemanWunschAlignments: result.alignments
    });
  }
  else
  {
    response.status(500).send({
      error: result.error
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server opened on port ${port}`);
});
