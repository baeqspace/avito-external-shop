export function Button({children, classes, ...props}) {
    return (
        <button {...props} className={"button-ui rounded-3xl w-fit px-12 py-5 text-3xl " + classes}>
            {children}
        </button>
    )
}