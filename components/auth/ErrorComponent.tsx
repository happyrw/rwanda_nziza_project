"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-6">
                {error === "AccessDenied" && "Email in use with a different provider."}
            </p>
            <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
                Sign In
            </button>
        </div>
    );
}
