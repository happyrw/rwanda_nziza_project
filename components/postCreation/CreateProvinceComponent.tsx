"use client";
import { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

import CategoryComponent from "./categoryComponent";
import NotePicker from "./tipTap/NotePicker";
import NotesPreview from "./tipTap/Notes";

import axios from 'axios';
import { useSearchParams } from "next/navigation";
import { fetchDistrictById, fetchEconomicActivityById, fetchEventById, fetchProvinceById } from "@/lib/data";
import LoaderComponent from "../loader";

import toast from "react-hot-toast";

interface Props {
    province: { name: string; _id: string; }[];
    districts: { name: string; _id: string }[];
}

export default function BlogPostForm({ province, districts }: Props) {
    const [videoUrl, setVideoUrl] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [mainImages, setMainImages] = useState<File[]>([]);

    const [Category, setCategory] = useState("");
    const [event, setEvent] = useState("");
    const [postType, setPostType] = useState("")
    const [showActivity, setShowActivity] = useState(true);

    const [error, setError] = useState("");
    const [submission, setSubmission] = useState(false);

    const [districtSelected, setDistrictSelected] = useState("");
    const [provinceSelected, setProvinceSelected] = useState("");

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<string | null>(null);

    const { register, control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            title: "",
            images: "",
            description: "",
            videoUrl: "",
            Category: "",
            event: "",
            date: "",
            location: {
                longitude: undefined,
                latitude: undefined,
            },
            districtToBeSelected: "",
            subServices: [{ name: "", photo: [] as string[], description: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subServices",
    });

    // For single post start
    const searchParam = useSearchParams();

    useEffect(() => {
        const fetchPost = async (postId: string) => {
            setLoading(true);
            try {
                let post = null;  // Initialize post variable

                if (postType === "Economic") {
                    post = await fetchEconomicActivityById(postId);  // Fetch based on postType
                } else if (postType === "Event") {
                    post = await fetchEventById(postId);
                } else if (postType === "Province") {
                    post = await fetchProvinceById(postId);
                } else if (postType === "District") {
                    post = await fetchDistrictById(postId);
                }

                // If id exists but no post was returned
                if (id && !post) {
                    setError("Post not found");  // Show error if needed
                    return;
                }

                // Set form fields using setValue
                setValue("title", (post as any).name);
                setValue("description", (post as any).description);
                setValue("location.latitude", (post as any).location.latitude);
                setValue("location.longitude", (post as any).location.longitude);
                setValue("Category", (post as any).type);
                setValue("images", (post as any).images); // Assuming images is a string array
                setValue("districtToBeSelected", (post as any).districtId);
                setValue("subServices", (post as any).subServices);
                setCategory((post as any).type); // Set the category
                setEvent((post as any).event); // If event data exists
                setMainImages((post as any).images); // If handling images separately in local state
                setVideoUrl((post as any).videoUrl);
                // setDistrictSelected((post as any).districtId);
                const selectedDistrict = districts.find((d) => d._id === (post as any).districtId)?.name;
                setDistrictSelected(selectedDistrict as string);

                const selectedProvince = province.find((d) => d._id === (post as any).provinceId)?.name;
                setProvinceSelected(selectedProvince as string);

            } catch (error) {
                console.error(error);
                setError("Failed to load post");
                // setLoading(false); // Set loading to false even in case of error
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost(id as string);
        };

        //eslint-disable-next-line
    }, [id, setValue, postType]);

    useEffect(() => {
        const postId = searchParam.get("id");
        const typeOfPost = searchParam.get("postType");

        setId(postId);
        setPostType(typeOfPost as string);
    }, [searchParam]);




    if (loading) {
        return <LoaderComponent />; // Render LoaderComponent while loading
    }

    if (id && error) {
        return <div>Error: {error}</div>; // Display error message if fetch fails
    }
    // For single post end

    // Watch form fields for the preview section
    const title = watch("title");
    const description = watch("description");
    const subServices = watch("subServices");

    const titleLength = title?.length || 0;
    const isTitleLengthValid = titleLength >= 10 && titleLength <= 100;

    const onSubmit = async (data: any) => {
        setError("");
        try {
            if (!postType) {
                return setError("Please select a post type");
            };
            if (!mainImages.length) {
                setError("Please select images");
                return;
            };
            if (!description) {
                return setError("Please include description");
            }

            setSubmission(true);

            data.images = mainImages;
            data.videoUrl = videoUrl;
            data.districtToBeSelected = districtSelected;

            data.location.latitude = parseFloat(data.location.latitude);
            data.location.longitude = parseFloat(data.location.longitude);

            // current coding
            if (postType === "Event") {
                if (!districtSelected) {
                    setSubmission(false);
                    return setError("Please select a district");
                };
                data["districtId"] = districtSelected;
                data.event = event;
                if (id) {
                    data["eventId"] = id;
                    await axios.post("/api/event/updateEvent", data);
                } else {
                    await axios.post("/api/event/createEvent", data);
                }
            };
            if (postType === "Province") {
                if (id) {
                    data["provinceId"] = id;
                    await axios.post("/api/province/updateProvince", data);
                } else {
                    await axios.post("/api/province/createProvince", data);
                }
            };
            if (postType === "District") {
                data["provinceId"] = provinceSelected;
                if (id) {
                    data["districtId"] = id;
                    await axios.post("/api/district/updateDistrict", data);
                } else {
                    await axios.post("/api/district/createDistrict", data);
                }
            };

            if (postType === "Economic Activity") {
                if (!districtSelected) {
                    setSubmission(false);
                    return setError("Please select a district");
                };
                data["districtId"] = districtSelected;
                data.Category = Category;
                if (id) {
                    data["economicActivityId"] = id;
                    await axios.post("/api/economicActivity/updateEconomicActivity", data);
                } else {
                    await axios.post("/api/economicActivity/createEconomicActivity", data);
                }
            };

            toast.success(`${postType} ${id ? "updated" : "created"} successfully!`);
            setSubmission(false);
        } catch (error) {
            setSubmission(false);
            console.log(error);
        }
    };

    // Function to handle URL change from input
    const handleUrlChange = (e: any) => {
        setVideoUrl(e.target.value);
    };

    // Extract video ID from the full URL
    const getEmbedUrl = (url: string) => {
        try {
            // Regex to extract the video ID from different formats of YouTube URLs
            const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const matches = url.match(regex);
            const videoId = matches ? matches[1] : null;

            if (!videoId) {
                return ''; // Return empty string if the videoId is not found
            }

            return `https://www.youtube.com/embed/${videoId}`;
        } catch (error) {
            console.error("Invalid URL provided", error);
            return ''; // Return empty string in case of error
        }
    };

    return (
        <div className={`mx-auto bg-white rounded-lg space-y-6 ${showPreview ? "p-0" : "p-6"}`}>
            {id ? ((showActivity && !Category && (postType === "Economic" || postType === "Event")) &&
                <CategoryComponent
                    postType={postType}
                    setPostType={setPostType}
                    setShowActivity={setShowActivity}
                    event={event}
                    setEvent={setEvent}
                    setCategory={setCategory}
                    Category={Category}
                />) : (showActivity &&
                    <CategoryComponent
                        postType={postType}
                        setPostType={setPostType}
                        setShowActivity={setShowActivity}
                        event={event}
                        setEvent={setEvent}
                        setCategory={setCategory}
                        Category={Category}
                    />)
            }

            {postType === "Event" && <h1 className="text-2xl mb-4 text-center w-full md:w-[500px] text-black/15 mx-auto p-2 font-semibold">You are {id ? "updating" : "creating"} an Event, and the option chosen is {Category}.</h1>}
            {postType === "Economic" && <h1 className="text-2xl mb-4 text-center w-full md:w-[500px] text-black/15 mx-auto p-2 font-semibold">You are {id ? "updating" : "creating"} an Economic Activity, and the option chosen is {Category}.</h1>}
            {postType === "Economic Activity" && <h1 className="text-2xl mb-4 text-center w-full md:w-[500px] text-black/15 mx-auto p-2 font-semibold">You are {id ? "updating" : "creating"} an Economic Activity, and the option chosen is {Category}.</h1>}
            {postType === "Province" && <h1 className="text-2xl mb-4 text-center w-full md:w-[500px] text-black/15 mx-auto p-2 font-semibold">You are {id ? "updating" : "creating"} a Province.</h1>}
            {postType === "District" && <h1 className="text-2xl mb-4 text-center w-full md:w-[500px] text-black/15 mx-auto p-2 font-semibold">You are {id ? "updating" : "creating"} a District.</h1>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full md:max-w-4xl mx-auto">
                <div>
                    <label className="block font-semibold text-2xl text-black/15">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true, minLength: 10, maxLength: 100 })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-bold text-black/30"
                        placeholder="Enter title"
                    />
                    <p className="mt-2 text-black/15">
                        {titleLength}/100 (between 10 and 100)
                        {isTitleLengthValid ? (
                            <span className="text-green-500 ml-2">✓ Valid</span>
                        ) : (
                            <span className="text-red-500 ml-2">Invalid</span>
                        )}
                    </p>
                </div>

                {(postType !== "Province" && postType !== "District") && (
                    <div>
                        <label className="block font-semibold text-2xl text-black/15">Select district</label>
                        <div className="mt-2">
                            <select
                                className="w-full mt-1 p-2 text-black/15 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-bold"
                                value={districtSelected}
                                onChange={(e) => {
                                    const selectedDistrict = e.target.value;
                                    setDistrictSelected(selectedDistrict);
                                }}
                            >
                                <option value="" defaultValue="Select a district" disabled>Select a district</option>
                                {districts.map((district) => (
                                    <option key={district._id} value={district._id} className="text-black">
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {postType === "District" && (
                    <div>
                        <label className="block font-semibold text-2xl text-black/15">Select province</label>
                        <div className="mt-2">
                            <select
                                className="w-full mt-1 p-2 text-black/15 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-bold"
                                value={provinceSelected}
                                onChange={(e) => {
                                    const selectedProvince = e.target.value;
                                    setProvinceSelected(selectedProvince);
                                }}
                            >
                                <option value="" defaultValue="Select a province" disabled>Select a province</option>
                                {province.map((p) => (
                                    <option key={p._id} value={p._id} className="text-black">
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block font-semibold text-2xl text-black/15">Main Images</label>
                    {mainImages.length > 0 && (<>
                        <div className="grid grid-cols-5 gap-3 border p-2 border-slate-200">
                            {mainImages.map((image, index) => (
                                <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
                                    <Image src={image as any} alt="" fill className="object-cover" />
                                    <button
                                        type="button"
                                        className="absolute bg-red-500 text-white rounded-full right-1 top-1 p-2 cursor-pointer"
                                        onClick={() => {
                                            // Remove the clicked image
                                            const updatedImages = mainImages.filter((_, imgIndex) => imgIndex !== index);
                                            setMainImages(updatedImages);
                                        }}
                                    >
                                        <X className="text-white w-4 h-4 font-bold" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-400">{mainImages.length}/10 uploaded</p>
                    </>)}
                </div>

                {mainImages.length < 10 && (
                    <div className="border-dashed border-2 w-full py-10 border-black/15">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                const uploadedFiles = res.map(file => file.url);
                                setMainImages([...mainImages, ...uploadedFiles as any]);
                            }}
                            onUploadError={(error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                )}


                <div>
                    <label className="block font-semibold text-2xl text-black/15">Description</label>
                    <NotePicker
                        content={description}
                        onChange={(content) => setValue("description", content)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-2xl text-black/15">Location</label>
                    <div className="flex items-center w-full gap-5">
                        <input
                            type="string"
                            {...register("location.latitude")}
                            placeholder="Enter latitude"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-semibold text-black/30"
                        />
                        <input
                            type="string"
                            {...register("location.longitude")}
                            placeholder="Enter longitude"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-semibold text-black/30"
                        />
                    </div>
                </div>

                {postType === "Event" &&
                    <div>
                        <label className="block font-semibold text-2xl text-black/15">Date</label>
                        <input
                            type="date"
                            {...register("date")}
                            placeholder="Enter longitude"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-semibold"
                        />
                    </div>
                }

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-black/20">Sub-Post( optional )</h2>
                    {fields.map((item, index) => (
                        <div key={item.id} className="border p-4 rounded-lg space-y-2 bg-gray-50">
                            <label className="block font-bold text-sm text-indigo-700">
                                Sub-Post {index + 1}
                            </label>

                            <label className="block font-semibold text-2xl text-black/15 mt-5">Title</label>
                            <input
                                type="text"
                                {...register(`subServices.${index}.name`)}
                                placeholder="Enter sub-post name"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 font-semibold text-black/30"
                            />

                            <div>
                                <label className="block font-semibold text-2xl text-black/15 mt-5">Images</label>
                                {subServices[index]?.photo?.length > 0 && (
                                    <>
                                        <div className="grid grid-cols-5 gap-3 border p-2 border-slate-200">
                                            {subServices[index].photo.map((image, imgIndex) => (
                                                <div key={imgIndex} className="relative aspect-video rounded-xl overflow-hidden">
                                                    <Image src={image} alt="" fill className="object-cover" />
                                                    <button
                                                        type="button"
                                                        className="absolute bg-red-500 text-white rounded-full right-1 top-1 p-2 cursor-pointer"
                                                        onClick={() => {
                                                            // Remove the clicked image
                                                            const updatedPhotos = subServices[index].photo.filter((_, photoIndex) => photoIndex !== imgIndex);
                                                            setValue(`subServices.${index}.photo`, updatedPhotos);
                                                        }}
                                                    >
                                                        <X className="text-white w-4 h-4 font-bold" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-400">
                                            {subServices[index].photo.length}/10 uploaded
                                        </p>
                                    </>
                                )}
                            </div>
                            {(subServices[index]?.photo?.length ?? 0) < 10 && (
                                <div className="border-dashed border-2 w-full py-10 border-black/15">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            const newPhotos = res.map((file) => file.url);
                                            setValue(
                                                `subServices.${index}.photo`,
                                                [...(subServices[index].photo || []), ...newPhotos]
                                            );
                                        }}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                            )}

                            <label className="block font-semibold text-xl text-black/15">Description</label>
                            <NotePicker
                                content={watch(`subServices.${index}.description`)}
                                onChange={(content) => setValue(`subServices.${index}.description`, content, { shouldValidate: true })}
                            />

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="w-full text-red-500 bg-red-700/15 text-sm mt-2 font-semibold py-2"
                            >
                                Remove Sub-Post
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: "", photo: [], description: "" })}
                        className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg"
                    >
                        + Add Sub-Service
                    </button>
                </div>

                <div className="w-full">
                    {/* Video URL Input */}
                    <label className="block font-semibold text-2xl text-black/15 mt-5">Video URL</label>
                    <input
                        type="text"
                        placeholder="Enter YouTube URL"
                        value={videoUrl}
                        onChange={handleUrlChange}
                        className="text-sm w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 text-black/30"
                    />

                    {/* Embed Video */}
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

                {showPreview &&
                    <NotesPreview
                        title={title}
                        setShowPreview={setShowPreview}
                        getEmbedUrl={getEmbedUrl}
                        videoUrl={videoUrl}
                        images={mainImages}
                        description={description}
                        subServices={subServices}
                    />
                }
                <button type="button" onClick={() => setShowPreview(true)} className="w-full bg-black/20 py-2 rounded-xl text-white font-bold">Preview</button>
                {error && <p className="bg-red-700/15 text-red-700 py-2 w-full rounded-md px-4">{error}</p>}
                <button
                    type="submit"
                    disabled={submission}
                    className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg mt-4"
                >
                    {submission ? <Loader className="animate-spin w-8 h-8 mx-auto" /> : "Submit Blog Post"}
                </button>

            </form>
        </div>
    );
};
