import { MutableRefObject } from "react";

interface ISortProps {
    sort: () => void;
    styles: string;
    reference: MutableRefObject<HTMLSelectElement | null>;
}

const Sort = ({ styles, sort, reference }: ISortProps) => {
    return (
        <>
            <select role="sort" ref={reference} className={styles} onChange={sort} name="sort" id="sort">
                <option value="Sort by:">Sort by:</option>
                <option role="atoz" value="A-Z">A - Z</option>
                <option role="ztoa" value="Z-A">Z - A</option>
            </select>
        </>
    )
}

export default Sort;