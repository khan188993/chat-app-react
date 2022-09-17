import getAvatar from "gravatar-url";
import { useSelector } from "react-redux";

export default function ChatHead({ message }) {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const { sender, receiver } = message || {};

    const partnerEmail = sender.email === email ? receiver.email : sender.email;
    const partnerName = sender.email === email ? receiver.name : sender.name;

    return (
        <div className="relative flex items-center border-b border-gray-300 p-3">
            <img
                className="h-10 w-10 rounded-full object-cover"
                src={getAvatar(partnerEmail, {
                    size: 80,
                })}
                alt={partnerName}
            />
            <span className="ml-2 block font-bold text-gray-600">{partnerName}</span>
        </div>
    );
}
