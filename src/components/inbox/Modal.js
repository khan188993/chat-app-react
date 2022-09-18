/*eslint-disable */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsApi } from "../../features/conversations/conversationsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const [userCheck, setUserCheck] = useState(false);
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
    const { email: myEmail } = loggedInUser || {};
    const dispatch = useDispatch();
    const [responseError, setResponseError] = useState("");
    const [conversation, setConversation] = useState(undefined);

    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck,
    });

    useEffect(() => {
        if (participant?.length > 0 && participant[0].email !== myEmail) {
            // check conversation existance
            dispatch(
                conversationsApi.endpoints.getConversation.initiate({
                    userEmail: myEmail,
                    participantEmail: to,
                })
            )
                .unwrap()
                .then((data) => {
                    setConversation(data);
                })
                .catch((err) => {
                    setResponseError("There was a problem!");
                });
        }
    }, [participant, dispatch, myEmail, to]);

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const doSearch = (value) => {
        if (isValidEmail(value)) {
            // check user API
            setUserCheck(true);
            setTo(value);
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed inset-0 z-10 h-full w-full cursor-pointer bg-black/50"
                />
                <div className="absolute top-1/2 left-1/2 z-20 w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-8 rounded bg-white p-10 lg:w-[600px]">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                                    placeholder="Send to"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                                disabled={
                                    conversation === undefined ||
                                    (participant?.length > 0 && participant[0].email === myEmail)
                                }
                            >
                                Send Message
                            </button>
                        </div>

                        {participant?.length === 0 && <Error message="This user does not exist!" />}
                        {participant?.length > 0 && participant[0].email === myEmail && (
                            <Error message="You can not send message to yourself!" />
                        )}

                        {responseError && <Error message={responseError} />}
                    </form>
                </div>
            </>
        )
    );
}
