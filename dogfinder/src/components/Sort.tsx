interface ISortProps {
    sortAtoZ: () => void;
    sortZtoA: () => void;
    styles: string;
}

const Sort = ({ sortAtoZ, sortZtoA, styles }: ISortProps) => {
    const sort = () => {
        const select = document.getElementById("sort") as HTMLSelectElement;
        if (select.value === "A-Z") {
            return sortAtoZ();
        } else if (select.value === "Z-A") {
            return sortZtoA();
        }
    }
    return (
        <>
            <select role="sort" className={styles} onChange={sort} name="sort" id="sort">
                <option value="Sort by:">Sort by:</option>
                <option role="atoz" value="A-Z">A - Z</option>
                <option role="ztoa" value="Z-A">Z - A</option>
            </select>
        </>
    )
}

export default Sort;