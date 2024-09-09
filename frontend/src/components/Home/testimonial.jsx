import React from 'react';

const sampletestimonials = [
    {
        id: 1,
        name: 'John Doe',
        quote: 'This product has been a game-changer for my business. Highly recommended!',
        avatar: '',
    },
    {
        id: 2,
        name: 'Jane Smith',
        quote: `I'm so glad I found this service. It has made my life so much easier.`,
        avatar: '',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        quote: `This is the best decision I've made in a long time. Truly impressed.`,
        avatar: '',
    },
];

export default function TestimonialSlider() {
    const defaultAvatar = 'https://res.cloudinary.com/diutjor80/image/upload/v1725446313/AutoBot/307ce493-b254-4b2d-8ba4-d12c080d6651_cmkepk.jpg';
    return (
        <div className='m-[15vh] flex gap-4 justify-center items-center'>
            {sampletestimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className="w-[30%] h-[40vh] flex flex-col space-y-4 justify-center items-center text-start bg-white rounded-lg border-2 border-black shadow-xl p-6 transition-all hover:scale-105"
                >
                    <img
                        src={testimonial.avatar || defaultAvatar} // Use default image if avatar is empty
                        alt={
                            testimonial.name ||
                            'Testimonial Author Avatar'
                        }
                        className="justify-self-start w-24 h-24 rounded-full mb-4"
                    />
                    <p className="text-gray-800 font-bold mb-2">
                        {testimonial.name}
                    </p>
                    <p className="text-gray-600">
                        {testimonial.quote}
                    </p>
                </div>
            ))}
        </div>
    );
}
