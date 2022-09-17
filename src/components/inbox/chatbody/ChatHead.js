export default function ChatHead({ avatar, name }) {
    return (
        <div className="relative flex items-center border-b border-gray-300 p-3">
            <img className="h-10 w-10 rounded-full object-cover" src={avatar} alt={name} />
            <span className="ml-2 block font-bold text-gray-600">{name}</span>
        </div>
    );
}
