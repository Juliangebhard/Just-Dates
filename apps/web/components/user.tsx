"use client";

import { api } from "@/trpc/react";

export function ShowUser() {
    const { data, isLoading } = api.user.showUser.useQuery({
        id: "2",
        text: "test",
        name: "julian",
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }
    return (
        <div>
            <h1>{data.greeting}</h1>
            <p>id: {data.id}</p>
            <p>name: {data.name}</p>
        </div>
    );
}