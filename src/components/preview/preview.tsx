import { useEffect, useRef } from 'react';

interface PreviewProps {
    code: string;
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
`;

const Preview: React.FC<PreviewProps> = ({code}) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = iframeHTML;
        iframeRef.current.contentWindow.postMessage(code, '*');
    }, [code]);

    return (
    <iframe 
        title="Preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeHTML}
    />);
}

export default Preview;
