import blankImage from "../../assets/images/blank.svg";

export default function Blank() {
    return (
        <div className="flex h-[calc(100vh_-_129px)] items-center justify-center text-gray-700 md:flex-col md:space-y-4">
            <img src={blankImage} alt="No messages" className="hidden w-10 md:block" />
            <div className="min-w-[130px] -rotate-90 md:min-w-0 md:rotate-0">No messages yet</div>
        </div>
    );
}
