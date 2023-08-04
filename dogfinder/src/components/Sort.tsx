interface ISortProps {
    sortAtoZ: () => void;
    sortZtoA: () => void;
    styles: string;
}

const Sort = ({ sortAtoZ, sortZtoA, styles }: ISortProps) => {
    return (
        <>
            <select role="sort" className={styles} name="sort" id="sort">
                <option value="Sort by:">Sort by:</option>
                <option role="atoz" onClick={sortAtoZ} value="A-Z">A - Z</option>
                <option role="ztoa" onClick={sortZtoA} value="Z-A">Z - A</option>
            </select>
        </>
    )
}

export default Sort;