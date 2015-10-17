Package.describe({
  name: 'aheissenberger:memjs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A Meteor wrapper for memjs memcache client with binary protocol and SASL authentication for MemCachier',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/aheissenberger/meteor-memjs.git',
  author: 'Andreas Heissenberger (http://www.heissenberger.at)',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  // api.use('ecmascript');
  //api.use("meteorhacks:async@1.0.0", "server");
  api.addFiles('memjs.js');
  if ( api.export ) {
    api.export( 'MemJS', [ 'server' ] );
  }
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('aheissenberger:memjs');
  api.addFiles('memjs-tests.js');
});

Npm.depends({ 'memjs': '0.8.4' });