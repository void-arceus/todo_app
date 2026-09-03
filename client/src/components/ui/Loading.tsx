interface ILoadingProps {
    size: number;
    color: "black" | "white";
}

function Loading({ size = 4, color = "white" }: ILoadingProps) {
    if (size & 1) {
        ++size;
    }
    return (
        <div
            className={`h-${size} w-${size} animate-spin rounded-full border-2 border-transparent border-t-${color} border-r-${color}`}
        />
    );
}

export default Loading;
