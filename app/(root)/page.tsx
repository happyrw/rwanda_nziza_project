import Hero from "@/components/home/Hero";
import LinkerComponent from "@/components/home/LinkerComponent";
import MucyoComponent from "@/components/home/MucyoComponent";
import MainBottom from "@/components/MainBottom";
import Footer from "@/components/shared/Footer";
import SearchComponent from "@/components/shared/SearchComponent";

export default async function Home() {
  return (
    <div>
      <Hero />
      <div className="-mt-14">
        <LinkerComponent />
      </div>
      <MucyoComponent />
      <MainBottom />
      <Footer />

      {/* Search */}
      <SearchComponent />
    </div>
  )
}