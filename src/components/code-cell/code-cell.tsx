import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';

import CodeEditor from './code-editor/code-editor';
import Preview from './preview/preview';
import bundler from '../../bundler';
import Resizable from './resizable/resizable';

const CodeCell = () => {    
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const transpiledCode = await bundler(input);
        setCode(transpiledCode);
    };

    return (
        <Resizable direction='vertical'>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <CodeEditor 
                    initialValue="const a = 1;"
                    onChange={(value) => setInput(value)}
                />
                {/* <div>
                    <button onClick={onClick}>Submit</button>
                </div> */}
                <Preview code={code}/>
            </div>
        </Resizable>
    );
}

export default CodeCell;
