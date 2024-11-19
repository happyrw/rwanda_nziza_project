"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStateContext } from "@/context/stateContext";
import LoaderComponent from "../loader";

const SearchComponent = () => {

    const { handleSearch, searchedTerm, setSearchedTerm, setSearchedItems, searchedItems } = useStateContext();
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the URL contains the "query" parameter
        const query = searchParams.get("query");
        if (query) {
            setLoading(true); // Start loading
            setTimeout(() => {
                setSearched(true);
                setLoading(false); // Stop loading after 3 seconds
            }, 3000);
        } else {
            setSearched(false);
        }
    }, [searchParams]);

    if (loading) {
        return <LoaderComponent />
    }

    return (
        <div className={`top-0 h-screen w-full bg-white z-30 no-scrollbar overflow-y-auto pb-5 px-5 md:px-10 ${searched ? "fixed" : "hidden"}`}>
            <form
                onSubmit={handleSearch}
                className="m-auto flex items-center w-full lg:w-[800px] h-14 lg:h-20 px-5 py-2 gap-4 rounded-md"
            >
                <input
                    type="text"
                    value={searchedTerm}
                    onChange={(e) => setSearchedTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-full shadow-sm border-none outline-none py-2 px-4 shadow-black"
                />
                <Image
                    src="/cross.svg"
                    alt="search-icon"
                    width={250}
                    height={250}
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => {
                        setSearchedTerm("");
                        setSearchedItems([]); // Reset to original list if no query
                        router.push("/"); // Navigate back to home page
                    }}
                />
            </form>
            {searchedItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3">
                    {searchedItems?.map((singleJourney: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 shadow-lg py-5 px-2 cursor-pointer"
                        >
                            <div className="relative px-3 aspect-video">
                                <Image
                                    fill
                                    src={singleJourney.Image}
                                    alt="Image"
                                    className="object-cover rounded-lg h-full w-full"
                                />
                            </div>
                            <h3 className="text-sm font-bold">{singleJourney.title}</h3>
                            <p className="text-sm text-gray-500">Post Description</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center py-10 font-bold text-xl">We don&apos;t have what you are looking for. <br /> You can try different word instead of <span className="underline capitalize">{searchedTerm}</span></p>
            )}
        </div>
    );
};

export default SearchComponent;
