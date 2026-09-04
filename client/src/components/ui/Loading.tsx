interface ILoadingProps {
    size: number;
    color: "black" | "white";
}

function Loading({ size = 4, color = "white" }: ILoadingProps) {
    if (size & 1) {
        ++size;
    }
    const border = `${color === "white" ? "border-t-white border-r-white" : "border-t-black, border-r-black"}`;

    return (
        <div
            className={`h-${size} w-${size} animate-spin rounded-full border-2 border-transparent ${border}`}
        ></div>
    );
}

export default Loading;
