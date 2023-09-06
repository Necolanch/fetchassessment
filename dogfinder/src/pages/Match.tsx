import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useFetchMatch from "../hooks/useFetchMatch";

const Match = () => {
    const navigate = useNavigate();
    const { dogMatch } = useFetchMatch();

    return (
        <div className={`w-screen h-screen bg-gradient-to-tr from-[#40E0D0] to-teal-200`}>
            <div className="w-screen h-20 relative top-8 flex justify-center items-center">
                <h1 className="font-light text-4xl text-cyan-950 text-center">NewHome</h1>
                <img src={require("../img/pawprint.png")} alt="Pawprint" width={40} height={40} />
            </div>
            <p className="mt-4 text-center font-light text-sm">New friend, new home</p>
            <div className="flex items-center ml-4" onClick={() => navigate("/search")}>
                <IoMdArrowRoundBack />
                <p className="underline underline-offset-4 w-32 hover:cursor-pointer">Back to Search</p>
            </div>
            {
                dogMatch.length === 0 ? (<p className="text-center text-3xl font-bold mt-12">Like some dogs first before generating your match</p>)
                    : (
                        <div className="w-full flex flex-col items-center mt-12">
                            <h3 className="text-xl font-semibold">Your New Friend!</h3>
                            <section className="w-4/5 md:w-1/2 lg:w-1/4 bg-cyan-700 text-yellow-200 p-4 mt-4 rounded-md">
                                <img className="w-full" src={dogMatch[0].img} alt="Cute doggy" />
                                <div className="w-full flex items-center justify-center mt-2">
                                    <h3 className=" font-semibold text-2xl md:text-3xl">{dogMatch[0].name}</h3>
                                </div>
                                <div className="md:text-lg">
                                    <p>Age: {dogMatch[0].age}</p>
                                    <p>Breed: {dogMatch[0].breed}</p>
                                    <p>ZIP Code: {dogMatch[0].zip_code}</p>
                                </div>
                            </section>
                        </div>
                    )
            }
        </div>
    )
}

export default Match;