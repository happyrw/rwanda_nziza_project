"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { fetchUserByEmail } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { journey } from "@/constant";

interface Location {
    lat: number;
    lng: number;
}

type StateContextType = {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    addTask: boolean;
    businessLocation: any;
    setBusinessLocation: Dispatch<SetStateAction<any>>,
    businessLocations: any[];
    setBusinessLocations: Dispatch<SetStateAction<any[]>>,
    userLocation: Location | undefined;
    setUserLocation: Dispatch<SetStateAction<Location | undefined>>,
    setAddTask: Dispatch<SetStateAction<boolean>>,
    expandedOrderId: number | null,
    setExpandedOrderId: Dispatch<SetStateAction<number | null>>;
    selectedBusiness: any;
    setSelectedBusiness: Dispatch<SetStateAction<any>>;
    selectedBusinessId: any[] | undefined;
    setSelectedBusinessId: Dispatch<SetStateAction<any[] | undefined>>;
    businessLocationsName: any[] | undefined;
    setBusinessLocationsName: Dispatch<SetStateAction<any[] | undefined>>;
    businessItem: any;
    setBusinessItem: Dispatch<SetStateAction<any | undefined>>;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void,
    searchedTerm: string,
    setSearchedTerm: Dispatch<SetStateAction<string>>,
    setSearchedItems: Dispatch<SetStateAction<any[]>>,
    searchedItems: any[]
};
const context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [addTask, setAddTask] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(0);
    const [userLocation, setUserLocation] = useState<Location>();
    const [businessLocation, setBusinessLocation] = useState<any>()
    const [businessLocations, setBusinessLocations] = useState<any[]>([])
    const [selectedBusiness, setSelectedBusiness] = useState<any>()
    const [selectedBusinessId, setSelectedBusinessId] = useState<any[]>()
    const [businessLocationsName, setBusinessLocationsName] = useState<any[]>()
    const [businessItem, setBusinessItem] = useState<any>();
    const [searchedTerm, setSearchedTerm] = useState<string>("");
    const [searchedItems, setSearchedItems] = useState<any[]>([]);


    const { data: Session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const getUser = async (session: any) => {
        try {
            const response = await fetchUserByEmail(session?.user?.email)
            setUser(response)
        } catch (error) {
            console.error(error)
        }
    };

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        })
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (Session) {
            getUser(Session);
        }
    }, [Session]);

    useEffect(() => {
        if (businessLocation) {
            const transformedLocations = businessLocation?.map((location: any) => ({
                lat: location.lat,
                lng: location.lng
            }));
            // Done
            setBusinessLocations(transformedLocations);
        }
    }, [businessLocation]);

    useEffect(() => {
        if (businessLocations) {
            const transformedLocations = businessLocation?.map((location: any) => ({
                name: location.name,
            }));

            setBusinessLocationsName(transformedLocations);
        }
    }, [businessLocations, businessLocation]);

    useEffect(() => {
        if (businessLocations) {
            const transformedLocations = businessLocation?.map((location: any) => ({
                name: location.id,
            }));

            setSelectedBusinessId(transformedLocations);
        }
    }, [businessLocations, businessLocation]);

    // 
    // Update search term and URL
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchedTerm.trim()) {
            // Update the URL with the search query
            const params = new URLSearchParams(searchParams.toString());
            params.set("query", searchedTerm);
            router.push(`/?${params.toString()}`);
        }
    };

    // Filter journeys based on the search term
    const filterJourneys = (term: string) => {
        const filtered = journey.filter((item) =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchedItems(filtered);
    };

    // Load results from query string on mount or when it changes
    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchedTerm(query);
            filterJourneys(query);
        } else {
            setSearchedItems(journey); // Reset to original list if no query
        }
    }, [searchParams]);

    // 

    if (user && Session && !user?.username) {
        router.push("/onboarding");
    };

    const value = {
        user,
        setUser,
        addTask,
        setAddTask,
        expandedOrderId,
        setExpandedOrderId,
        userLocation,
        setUserLocation,
        businessLocation,
        setBusinessLocation,
        businessLocations,
        setBusinessLocations,
        selectedBusiness,
        setSelectedBusiness,
        businessLocationsName,
        setBusinessLocationsName,
        selectedBusinessId,
        setSelectedBusinessId,
        businessItem,
        setBusinessItem,
        handleSearch,
        searchedTerm,
        setSearchedTerm,
        setSearchedItems,
        searchedItems
    }


    return (
        <context.Provider
            value={value}
        >
            {children}
        </context.Provider>
    )
};

export const useStateContext = () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
        throw new Error("useStateContext must be used within a StateContext Provider");
    }
    return ctx;
};

