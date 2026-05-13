import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
const Layout = ({children}) => {
    return (
    <div>
        <Suspense 
        fallback={<BarLoader className="mt-4" width={"100%"} color="#0f766e" />}
        >
            {children}
        </Suspense>
     </div>
    );

    
};
export default Layout;
