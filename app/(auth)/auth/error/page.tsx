import ErrorComponent from "@/components/auth/ErrorComponent";
import { Suspense } from "react";

export default function AuthErrorPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ErrorComponent />
        </Suspense>
    );
}
