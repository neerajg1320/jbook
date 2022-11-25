import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useState } from 'react';

import CodeEditor from './code-editor/code-editor';
import Preview from './preview/preview';
import bundler from '../../bundler';
import Resizable from './resizable/resizable';
import { useEffect } from 'react';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

interface CodeCellProps {
    cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {    
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(cell.content);     
            // console.log(`output=${JSON.stringify(output, null, 2)}`);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [cell.content]);

    return (
        <Resizable direction='vertical'>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction='horizontal'> 
                    <CodeEditor 
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} err={err}/>
            </div>
        </Resizable>
    );
}

export default CodeCell;
