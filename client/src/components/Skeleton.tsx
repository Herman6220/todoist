
const Skeleton = () => {
    return (
        <>
            <style>
                {`
                @keyframes slideToRight{
                    0%{
                        left: 0%;
                        transform: translate(-100%)
                    }
                    100%{left: 100%;}
                }
                
                @keyframes opacityPing{
                    0%{opacity: 0.8;}
                    50%{opacity: 1;}
                    100%{opacity: 0.8;}
                }
                
            `}
            </style>
            <div className="w-full h-full relative bg-neutral-800 rounded-lg overflow-hidden" style={{animation: "opacityPing 3s infinite"}}>
                <div className="absolute h-full w-[50%] bg-neutral-700 blur-3xl left-0 -skew-x-[80deg]" style={{ animation: "slideToRight 3s infinite" }}></div>
            </div>
        </>
    )
}

export default Skeleton