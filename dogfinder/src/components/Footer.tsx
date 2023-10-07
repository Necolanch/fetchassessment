interface IFooterProps {
    nextPage: () => void;
    previousPage: () => void;
    previous: string;
    next: string;
}

const Footer = ({ nextPage, previousPage, previous, next }: IFooterProps) => {
    return (
        <footer className="w-full flex justify-around my-10">
            {
                previous === "" ? (
                    <p onClick={nextPage} className="hover:cursor-pointer hover:underline hover:text-slate-600">{`Next ->`}</p>
                ) : next === "" ? (
                    <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={previousPage}>{`<- Previous`}</p>
                ) : (
                    <>
                        <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={previousPage}>{`<- Previous`}</p>
                        <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={nextPage}>{`Next ->`}</p>
                    </>
                )
            }

        </footer>
    )
}

export default Footer;