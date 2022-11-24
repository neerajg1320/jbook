import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'fileCache'
  });

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',

        setup(build: esbuild.PluginBuild) {
            build.onLoad({filter: /^index\.js$/}, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

            build.onLoad({filter: /.*/}, async (args: any) => {
                // Return object from cache if available
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    console.log(`Package ${args.path} found in Cache`);
                    return cachedResult;
                }
                return null;
            });

            build.onLoad({filter: /\.css$/}, async (args: any) => {
                // If not available in cache, then load file and save object in cache
                const { data, request } = await axios.get(args.path);
                
                const escapedData = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents = `
                        const style = document.createElement('style');
                        style.innerText = '${escapedData}';
                        document.head.appendChild(style);
                    `;

                const importPath = new URL('./', request.responseURL).pathname;
                
                const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents: contents,
                resolveDir: importPath,
                };
        
                await fileCache.setItem(args.path, result);
                console.log(`Package ${args.path} saved to Cache`);
                return result;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // If not available in cache, then load file and save object in cache
                const { data, request } = await axios.get(args.path);
                const importPath = new URL('./', request.responseURL).pathname;
                
                const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents: data,
                resolveDir: importPath,
                };
        
                await fileCache.setItem(args.path, result);
                console.log(`Package ${args.path} saved to Cache`);
                return result;
            });            
        } 
    }
}