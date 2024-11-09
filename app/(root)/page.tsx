import LinkerComponent from "@/components/home/LinkerComponent";
import MucyoComponent from "@/components/home/MucyoComponent";

export default async function Home() {
  return (
    <div className="p-2">
      <LinkerComponent />
      <MucyoComponent />
    </div>
  )
}