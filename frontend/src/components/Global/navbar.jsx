import Logo from "../../assets/logo.png";

export default function Navbar() {
    return (
        <nav className="shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="w-[100%] flex justify-between">
                    <div className="w-[20%] flex items-center">
                        <img src={Logo} alt="AutoBot" title="AutoBot" className="h-10 w-10" />
                        <p className="text-2xl font-bold ml-2 font-suse">AutoBot</p>
                    </div>
                    <div className="w-[35%] flex gap-[5%] items-center text-lg">
                        <a href="/" className="text-gray-700 hover:text-[#042d76] hover:underline mr-4">Home</a>
                        <a href="#" className="text-gray-700 hover:text-[#042d76] hover:underline mr-4">About</a>
                        <a href="/playground" className="text-gray-700 hover:text-[#042d76] hover:underline mr-4">Playground</a>
                        <a href="#" className="text-gray-700 hover:text-[#042d76] hover:underline mr-4">Contact</a>
                        <a href="/login" className="text-gray-700 hover:text-[#042d76] hover:underline mr-4">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
