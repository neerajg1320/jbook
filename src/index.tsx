import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
// import CodeCell from './components/code-cell/code-cell';
import TextEditor from './components/text-cell/text-editor/text-editor';


const App = () => {    

    return (
        <div>
            {/* <CodeCell /> */}
            <TextEditor />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
