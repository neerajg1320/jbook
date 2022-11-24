import './resizable.css';
import { ResizableBox } from "react-resizable";

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode; 
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
    return (
        <ResizableBox 
            width={Infinity} 
            height={300}
            minConstraints={[Infinity, 72]}
            maxConstraints={[Infinity, window.innerHeight * 0.9]}
            resizeHandles={['s']}
        >
            {children}
        </ResizableBox>
    );
};

export default Resizable;
