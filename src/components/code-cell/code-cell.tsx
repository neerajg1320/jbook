import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';

import CodeEditor from './code-editor/code-editor';
import Preview from './preview/preview';
import bundler from '../../bundler';
import Resizable from './resizable/resizable';
import { useEffect } from 'react';

const CodeCell = () => {    
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(input);     
            console.log(`output=${JSON.stringify(output, null, 2)}`);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <Resizable direction='vertical'>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction='horizontal'> 
                    <CodeEditor 
                        initialValue="const a = 1;"
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} err={err}/>
            </div>
        </Resizable>
    );
}

export default CodeCell;
