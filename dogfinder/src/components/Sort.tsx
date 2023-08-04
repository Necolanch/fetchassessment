interface ISortProps {
    sortAtoZ: () => void;
    sortZtoA: () => void;
}

const Sort = ({ sortAtoZ, sortZtoA }: ISortProps) => {
    return (
        <>
            <select name="sort" id="sort">
                <option onClick={sortAtoZ} value="A-Z">A - Z</option>
                <option onClick={sortZtoA} value="Z-A">Z - A</option>
            </select>
        </>
    )
}

export default Sort;