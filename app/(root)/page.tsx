import LinkerComponent from "@/components/home/LinkerComponent";
import MucyoComponent from "@/components/home/MucyoComponent";
import MainBottom from "@/components/MainBottom";
import Footer from "@/components/shared/Footer";

export default async function Home() {
  return (
    <div>
      <LinkerComponent />
      <MucyoComponent />
      <MainBottom />
      <Footer />
    </div>
  )
}