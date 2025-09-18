"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map").then(m => m.Map), { ssr: false });

export default DynamicMap;


