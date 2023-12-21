import { Hero } from "@/app/components";


const Home = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-radial-gradient p-4 md:p-10">
      <div className="flex w-full flex-col items-center justify-center rounded-lg text-center">
        <Hero />
      </div>
    </main>
  );
};

export default Home;
