import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',

    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /^index\.js$/ }, () => {
        return {path: 'index.js', namespace: 'a'};
      });

      // Handle relative files beginning with './' or '../'
      build.onResolve({ filter: /^\.{1,2}\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };

      });
    },
  };
};