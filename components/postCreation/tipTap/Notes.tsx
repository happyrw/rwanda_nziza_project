import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    title: string;
    videoUrl: string;
    getEmbedUrl: (url: string) => string;
    images: File[];
    description: string;
    subServices: { name: string; description: string; photo?: string[] }[];
    setShowPreview: Dispatch<SetStateAction<boolean>>
}

const NotesPreview = ({
    title,
    description,
    subServices,
    images,
    videoUrl,
    getEmbedUrl,
    setShowPreview
}: Props) => {
    return (
        <div className='fixed left-0 bottom-0 right-0 bg-white px-2 py-5 md:px-10 h-screen overflow-y-auto no-scrollbar'>
            <div className="p-2 border rounded-lg space-y-6 max-w-[700px] mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                <div className="p-2 rounded-lg">
                    <h3 className="text-4xl font-bold">{title || "Title preview..."}</h3>

                    <div className="grid grid-cols-2 gap-2">
                        {images.slice(0, 2).map((image, index) => (
                            <div key={index} className='relative aspect-video mt-5 rounded-md overflow-hidden'>
                                <Image src={image as any} alt="" fill className='absolute object-cover border-[1px] border-orange-950 border-dashed' />
                            </div>
                        ))}
                    </div>

                    <div className='mt-4 px-4 grid grid-cols-5 justify-center gap-3'>
                        {/* Render only the first 4 images */}
                        {images.slice(2, 6).map((image, index) => (
                            <div key={index} className='relative aspect-video md:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10'>
                                <Image src={image as any} alt="" fill className="object-cover" />
                            </div>
                        ))}

                        {/* Display the fifth image with an overlay if there are more than 5 images */}
                        {images.length > 5 ? (
                            <div className='relative aspect-video md:rounded-xl overflow-hidden'>
                                <Image src={images[4] as any} alt="" fill className="object-cover opacity-50" />

                                {/* Overlay showing how many more images exist */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                    <span className="text-white text-2xl font-bold">+{(images.length - 7) > 0 && images.length - 7}</span>
                                </div>
                            </div>
                        ) : (
                            /* Render the fifth image without overlay if there are exactly 5 images */
                            images.length === 5 && (
                                <div className='relative aspect-video md:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10'>
                                    <Image src={images[4] as any} alt="" fill className="object-cover" />
                                </div>
                            )
                        )}
                    </div>


                    <div
                        className="ProseMirror whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

                    {/* Sub-services section with additional spacing */}
                    {subServices && subServices.length > 0 && (
                        <div className="mt-6 space-y-2">
                            <h4 className="font-bold text-sm">Sub-Services</h4>
                            <div>
                                {subServices.map((subService, idx) => (
                                    <div key={idx}>
                                        <p className="font-semibold text-2xl">{subService.name}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {subService.photo && subService.photo.slice(0, 2).map((image, index) => (
                                                <div key={index} className='relative aspect-video mt-5 rounded-md overflow-hidden'>
                                                    <Image src={image} alt="" fill className='absolute object-cover border-[1px] border-orange-950 border-dashed' />
                                                </div>
                                            ))}
                                        </div>
                                        {subService.photo && subService.photo.length > 0 && (
                                            <div className='mt-4 px-4 grid grid-cols-5 justify-center gap-3'>
                                                {subService.photo.slice(2, 6).map((image, index) => (
                                                    <div key={index} className='relative aspect-video md:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10'>
                                                        <Image src={image} alt="" fill className="object-cover" />
                                                    </div>
                                                ))}

                                                {subService.photo.length > 5 ? (
                                                    <div className='relative aspect-video md:rounded-xl overflow-hidden'>
                                                        <Image src={subService.photo[4]} alt="" fill className="object-cover opacity-50" />

                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                                            <span className="text-white text-2xl font-bold">+{(subService.photo.length - 7) > 0 && subService.photo.length - 7}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    subService.photo.length === 5 && (
                                                        <div className='relative aspect-video md:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10'>
                                                            <Image src={subService.photo[4]} alt="" fill className="object-cover" />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <div className="ProseMirror whitespace-pre-line" dangerouslySetInnerHTML={{ __html: subService.description || "Description preview..." }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        {videoUrl && (
                            <div className="mt-4">
                                <iframe
                                    width="560"
                                    height="315"
                                    className="w-full h-[200px] sm:h-[250px] md:w-[500px] md:h-[315px] mx-auto rounded-md"
                                    src={getEmbedUrl(videoUrl)}  // dynamically updating src with the input URL
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        )}
                    </div>
                </div>
                <button type="button" onClick={() => setShowPreview(false)} className="w-full bg-black/20 py-2 rounded-xl text-white font-bold">Leave Preview</button>
            </div>
        </div>
    );
};

export default NotesPreview;
