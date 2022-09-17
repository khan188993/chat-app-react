import Message from "./Message";

export default function Messages() {
    return (
        <div className="relative flex h-[calc(100vh_-_197px)] w-full flex-col-reverse overflow-y-auto p-6">
            <ul className="space-y-2">
                <Message justify="start" message="Hjdjd" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
                <Message justify="start" message="Hi" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
                <Message justify="start" message="Hi" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
                <Message justify="start" message="Hi" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
                <Message justify="start" message="Hi" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
                <Message justify="start" message="Hi" />
                <Message justify="start" message="How are you?" />
                <Message justify="end" message="I am fine what about you?" />
            </ul>
        </div>
    );
}
