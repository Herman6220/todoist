// import { CheckIcon } from "lucide-react"

export const AnimatedLogo = () => {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <style>
                {`
                    @keyframes appear{
                        0%{
                            opacity: 0;
                        }
                    }
                `}
            </style>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(1.2) translate(-7 0)"
                style={{animation: "appear 0.5s ease-in-out"}}
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.9) translate(4 10)"
                style={{animation: "appear 1s ease-in-out"}}
                opacity="0.8"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.7) translate(17 21)"
                style={{animation: "appear 1.5s ease-in-out"}}
                opacity="0.7"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.55) translate(32.5 35.5)"
                style={{animation: "appear 2s ease-in-out"}}
                opacity="0.6"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.45) translate(48 51)"
                style={{animation: "appear 2.5s ease-in-out"}}
                opacity="0.5"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.37) translate(67 69)"
                style={{animation: "appear 3s ease-in-out"}}
                opacity="0.4"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.30) translate(92 93)"
                style={{animation: "appear 3.5s ease-in-out"}}
                opacity="0.3"
            />
        </svg>
    )
}

export const Logo = () => {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(1.2) translate(-7 0)"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.9) translate(4 10)"
                opacity="0.8"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.7) translate(17 21)"
                opacity="0.7"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.55) translate(32.5 35.5)"
                opacity="0.6"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.45) translate(48 51)"
                opacity="0.5"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.37) translate(67 69)"
                opacity="0.4"
            />

            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap= "round"
                strokeLinejoin= "round"
                d="M20 50 L40 70 L80 30"
                transform="scale(0.30) translate(92 93)"
                opacity="0.3"
            />
        </svg>
    )
}