"use client";
export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)] mx-auto h-[100vh] dark:bg-[hsl(240,10%,3.9%)] bg-background-light w-full">
            <h1>404 tidak ditemukan</h1>
            <button className="text-primary font-bold mb-5 cursor-pointer hover:text-zinc-300 transition-colors duration-500" onClick={() => history.back()}>Kembali</button>
        </div>
    );
}