import { TextField } from "@mui/material";

export default function About() {
    return (
        <div className="h-screen w-screen bg-black text-white pt-28 pr-8 pl-8 pb-8 grid grid-cols-2 gap-4">
            <div className="w-full bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] rounded-xl p-6 flex flex-col gap-6 overflow-hidden">
                <h1 className='text-3xl font-extralight'>
                    About Me.
                </h1>
                <TextField
                    rows={8}
                    multiline
                />
            </div>
            <div className="w-full bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] rounded-xl p-6 overflow-hidden">
                Hello
            </div>
            <div className="w-full col-span-2 bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] rounded-xl p-6 overflow-hidden flex flex-col gap-4">
                <TextField
                    multiline
                />
                <TextField
                    multiline
                />
            </div>
        </div>
    )
}
