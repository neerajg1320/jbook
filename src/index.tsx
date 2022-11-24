import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
    const ref = useRef<any>();
    const iframeRef = useRef<any>();
    const [input, setInput] = useState('');
    
    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            // wasmURL: '/esbuild.wasm',
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
        // console.log(service);
    }

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        iframeRef.current.srcdoc = iframeHTML;

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });

        const transpiledCode = result.outputFiles[0].text;
        iframeRef.current.contentWindow.postMessage(transpiledCode, '*');
    }

    const iframeHTML = `
        <html>
            <head>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener(
                        'message', 
                        (event) => {
                            // console.log(event.data);
                            try {
                                eval(event.data);
                            } catch (err) {
                                const root = document.querySelector('#root');
                                root.innerHTML = '<div style="color: red;">' 
                                + '<h4>Runtime Eror</h4>' 
                                + err 
                                + '</div>';
                                
                                console.error(err);
                            }
                        }, 
                        false
                    );
                </script>
            </body>
        </html>
    `

    return (
        <div>
            <CodeEditor 
                initialValue="const a = 1;"
                onChange={(value) => setInput(value)}
            />
            <textarea 
                value={input} 
                onChange={e => {
                    // onClick(e.target.value);
                    setInput(e.target.value);
                }}
            >
            </textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="Code Executor" ref={iframeRef} sandbox="allow-scripts" srcDoc={iframeHTML}></iframe>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
