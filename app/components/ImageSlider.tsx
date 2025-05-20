import { useEffect, useState } from "react";
import { imageUrls } from "~/imageUrl";

const ImageSlider = () => {
    const [activeImageIndex, setactiveImageIndex] = useState(0)

    const handlePrevious = () => setactiveImageIndex(activeImageIndex == 0 ? imageUrls.length - 1 : activeImageIndex - 1)
    const handleNext = () => setactiveImageIndex((activeImageIndex + 1) % imageUrls.length)

    useEffect(() => {
        const timer = setTimeout(() => handleNext(), 3000)
        return (() => clearTimeout(timer))
    }, [activeImageIndex])


    return (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button
                className="p-3 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={handlePrevious}
       
       >
                Previous
            </button>

            {
                imageUrls.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="Random"
                        width={400}
                        height={400}
                        className={`w-[500px] h-[300px] object-contain 
                            ${activeImageIndex === index ? "block" : "hidden"}`}
                    />
                ))
            }

            <button
                className="p-3 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleNext}
            >
                Next
            </button>
        </div>

    );
};

export default ImageSlider;
