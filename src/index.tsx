import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/code-editor/code-editor';
import Preview from './components/preview/preview';
import bundler from './bundler';

const App = () => {    
    const [inputCode, setInputCode] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const transpiledCode = await bundler(inputCode);
        setCode(transpiledCode);
    };

    return (
        <div>
            <CodeEditor 
                initialValue="const a = 1;"
                onChange={(value) => setInputCode(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code}/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
