import BlogPostForm from '@/components/postCreation/CreateProvinceComponent';
import { fetchDistricts, fetchProvinces } from '@/lib/data';
import React, { Suspense } from 'react'

const CreateBlogPostPage = async () => {
    const province = JSON.parse(JSON.stringify(await fetchProvinces()));
    const district = JSON.parse(JSON.stringify(await fetchDistricts()));
    return (
        <div className='flex flex-col'>
            <p className='bg-green-700/15 text-green-700 py-4 text-center font-bold'>You are creating/updating a post, do not refresh the page to avoid losing data</p>
            <div className='pb-4 pt-10'>
                <Suspense fallback={<div>Loading...</div>}>
                    <BlogPostForm
                        province={province}
                        districts={district}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default CreateBlogPostPage;
