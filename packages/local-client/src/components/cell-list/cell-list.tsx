import { useTypedSelector } from "../../hooks/use-typed-selector";
import CellListItem from "./cell-list-item/cell-list-item";
import './cell-list.css';
import AddCell from "./add-cell/add-cell";
import { Fragment, useEffect } from "react";
import { useActions } from "../../hooks/use-actions";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => 
        order.map((id) => data[id]));

    const { fetchCells, saveCells } = useActions();
    useEffect(() => {
        fetchCells();
    }, []);

    // useEffect(() => {
    //     if (cells.length) {
    //         saveCells();
    //     }
        
    // }, [JSON.stringify(cells)]);

    const renderedCells = cells.map(cell => 
        <Fragment key={cell.id}> 
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id}/>
        </Fragment>
    );

    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} prevCellId={null}/>
            {renderedCells}
        </div>
    );
};

export default CellList;
