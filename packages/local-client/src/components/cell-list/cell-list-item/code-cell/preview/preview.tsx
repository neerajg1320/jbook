import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
    code: string;
    err: string;
}

const iframeHTML = `
<html>
    <head>
    <style>html {background-color: white;}</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;">' 
                + '<h4>Runtime Eror</h4>' 
                + err 
                + '</div>';
                console.error(err);
            };

            window.addEventListener(
                'error',
                (event) => {
                    event.preventDefault();
                    handleError(event.error);
                },
            );

            window.addEventListener(
                'message', 
                (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        handleError(err);
                    }
                }, 
                false
            );
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = iframeHTML;
        
        setTimeout(() => {
            iframeRef.current.contentWindow.postMessage(code, '*');
        }, 50);        
    }, [code]);

    // console.log(err);

    return (
        <div className='preview-wrapper'>
            <iframe 
                title="Preview"
                ref={iframeRef}
                sandbox="allow-scripts"
                srcDoc={iframeHTML}
            />
            {err && <div className="preview-error">{err}</div>}
        </div>
    );
}

export default Preview;
