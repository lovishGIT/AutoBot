const Ticket = ({ title, description, status, user }) => {
    let greeting = status.toLowerCase() === 'pending' ? '' : '✅';
    greeting = status.toLowerCase() === 'cancelled' ? '❌' : greeting;

    return (
        <div
            className={`w-[200px] h-[150px] flex flex-col justify-between border-b-2 border-solid border-black my-4 p-2 ${
                status == 'cancelled' ? 'opacity-50' : ''
            }`}
        >
            <div>
                <h3 className="text-xl first-letter:uppercase">
                    {title}{greeting}
                </h3>
                <p>{description}</p>
            </div>
            <span className="flex justify-self-end">
                <div className="w-[20px] h-[3vh] rounded-full bg-[#081547] text-transparent">
                    .
                </div>
                {user.length > 1 && (
                    <div className="w-[20px] h-[3vh] rounded-full bg-[#1b540a] text-transparent">
                        .
                    </div>
                )}
                {user.length > 2 && (
                    <div>+{user.length - 2} more</div>
                )}
            </span>
        </div>
    );
};

export const DayComponent = ({ date, tickets }) => {

    return (
        <div className="w-[30%] border-l-2 border-t-2 border-solid border-black" key={date}>
            <h3 className="text-center text-2xl border-b-2 border-black py-2">Day {date}</h3>
            {tickets.map((ticket, index) => (
                <Ticket key={index} {...ticket} />
            ))}
        </div>
    );
};

