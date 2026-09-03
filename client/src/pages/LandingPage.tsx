import Navbar from "../components/layout/Navbar";

function LandingPage() {
    return (
        <main className="h-screen w-full flex flex-col items-center">
            <Navbar />
            <section className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl">Landing Page</h1>
                <p className="text-sm">Will add this later...</p>
            </section>
        </main>
    );
}

export default LandingPage;
