declare type IUser = {
    id: string;
    username: string;
    email: string;
    profile: string;
    images: string[];
    password: string;
    emailVerified: boolean;
    role: "Admin" | "Visitor";
};

declare type ITestimony = {
    userId: Types.ObjectId;
    images: string[];
    text: string;
    visitedPlaces: string[];
};

declare type IExploreRwanda = {
    _id: string;
    name: string;
    images: string[];
    description: string;
    location: string;
    type: string;
    subServices: ISubService[];
}

declare type IUser = {
    email: string;
    profile: string;
    username: string;
    id: string;
}