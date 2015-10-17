Package.describe({
  name: 'aheissenberger:memjs',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Meteor wrapper for memjs memcache client with binary protocol, SASL authentication for MemCachier',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/aheissenberger/meteor-memjs.git',
  author: 'Andreas Heissenberger (http://www.heissenberger.at)',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('memjs.js');
  if ( api.export ) {
    api.export( 'MemJS', [ 'server' ] );
  }
});

Npm.depends({ 'memjs': '0.8.6' });

// install newer version from github - http://stackoverflow.com/a/19360725/1898127
//Npm.depends({ 'memjs': 'https://github.com/alevy/memjs/tarball/c8022f00d04f3de49f1c0da706405e8bd66d49b8' });