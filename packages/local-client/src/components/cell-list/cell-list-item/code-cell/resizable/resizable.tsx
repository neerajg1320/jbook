import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode; 
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75)

    useEffect(() => {
        let timer: any;

        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }            
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }    
            }, 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width]);

    if (direction === 'horizontal') {
        resizableProps = { 
            className: 'resize-horizontal', 
            width, 
            height: Infinity,
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                // console.log(data);
                setWidth(data.size.width);
            }
        }
    } else {
        resizableProps = {  
            width: Infinity, 
            height: 300,
            minConstraints: [Infinity, 72],
            maxConstraints: [Infinity, innerHeight * 0.9],
            resizeHandles: ['s'],
        }
    }

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    );
};

export default Resizable;
