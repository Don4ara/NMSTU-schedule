import * as React from "react";


export function SiteHeader() {
    const [pathname, setPathname] = React.useState(typeof window !== "undefined" ? window.location.pathname : "");

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setPathname(window.location.pathname);
        }
    }, []);
    const lastSegment = pathname?.split("/").filter(Boolean).pop() || "home";

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <h1 className="text-base font-medium capitalize">{lastSegment}</h1>
                <div className="ml-auto flex items-center gap-2">
                </div>
            </div>
        </header>
    )
}
