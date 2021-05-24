import React from 'react';
import { Helmet } from 'react-helmet';

export const LoadingPage = () => {
    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />
            </Helmet>
            {/*             <div class="bg-gray-800 text-white py-3 px-4 text-center fixed left-0 bottom-0 right-0 z-40">
                This a Full page overlay loading screen by RoccoHoward.
            <a class="underline text-gray-200" href="https://tailwindcomponents.com/component/full-page-overlay-loading-screen">Component details</a>
            </div>
 */}
            <div class="w-full h-full fixed block top-0 left-0 opacity-100 z-50">
                <span class="opacity-100 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: "50%" }}>
                    <div class="sk-folding-cube">
                        <div class="sk-cube1 sk-cube"></div>
                        <div class="sk-cube2 sk-cube"></div>
                        <div class="sk-cube4 sk-cube"></div>
                        <div class="sk-cube3 sk-cube"></div>
                    </div>
                </span>
            </div>
        </div>
    )
}
