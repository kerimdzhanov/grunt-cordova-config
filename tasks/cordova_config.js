/*
 * grunt-cordova-config
 * 
 *
 * Copyright (c) 2014 Andrey Shustariov
 * Licensed under the MIT license.
 */

var js2xmlparser = require("js2xmlparser");

module.exports = function (grunt) {
   'use strict';

   // Please see the Grunt documentation for more information regarding task
   // creation: http://gruntjs.com/creating-tasks

   grunt.registerMultiTask('cordova_config', 'Generates cordova config.xml', function () {

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
         id : grunt.option('id') || 'com.example.hello',
         version : grunt.option('version') || '0.0.1',
         name : grunt.option('name') || 'HelloWorld',
         description : grunt.option('description') || 'A sample Apache Cordova application that responds to the deviceready event.',
         author : grunt.option('author') || {
            email : 'dev@callback.apache.org',
            name : 'Apache Cordova Team',
            href : 'http://cordova.io'
         },
         content : grunt.option('content') || {src : 'index.html'},
         access : grunt.option('access') || {origin : '*'},
         preferences : grunt.option('preferences') || [
            {
               name : 'Fullscreen',
               value : true
            },
            {
               name : 'WebViewBounce',
               value : true
            }
         ],
         features : grunt.option('features') || []
      });

      var data = {
         '@' : {
            id : options.id,
            version : options.version,
            xmlns : 'http://www.w3.org/ns/widgets',
            'xmlns:cdv' : 'http://cordova.apache.org/ns/1.0'
         },
         name : options.name,
         description : options.description,
         author : {
            '@' : {
               email : options.author.email,
               href : options.author.href
            },
            '#' : options.author.name
         },
         content : {
            '@' : {
               src : options.content.src
            }
         },
         access : {
            '@' : {
               origin : options.access.origin
            }
         },
         preference : options.preferences.map(function(pref) {
            return {
               '@' : {
                  name : pref.name,
                  value : pref.value
               }
            };
         }),
         feature : options.features.map(function(feature) {
            return {
               '@' : {
                  name : feature.name
               },
               param : feature.params.map(function(param) {
                  var p = {
                     '@' : {
                        name : param.name,
                        value : param.value
                     }
                  };
                  if ('onload' in param) {
                     p['@'].onload = param.onload;
                  }
                  return p;
               })
            };
         })
      };

      var result = js2xmlparser("widget", data);

      // Write the destination file.
//      grunt.log.writeln(JSON.stringify(this));
      grunt.file.write(this.data.dest, result);

      grunt.log.writeln('File "' + this.data.dest + '" created.');
//      // Iterate over all specified file groups.
//      this.files.forEach(function (file) {
//         // Concat specified files.
//         var src = file.src.filter(function (filepath) {
//            // Warn on and remove invalid source files (if nonull was set).
//            if (!grunt.file.exists(filepath)) {
//               grunt.log.warn('Source file "' + filepath + '" not found.');
//               return false;
//            } else {
//               return true;
//            }
//         }).map(function (filepath) {
//            // Read file source.
//            return grunt.file.read(filepath);
//         }).join(grunt.util.normalizelf(options.separator));
//
//         // Handle options.
//         src += options.punctuation;
//
//         // Write the destination file.
//         grunt.file.write(file.dest, src);
//
//         // Print a success message.
//         grunt.log.writeln('File "' + file.dest + '" created.');
//      });
   });

};