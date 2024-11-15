"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    phone: z.string().min(2),
    province: z.string().min(2),
    message: z.string().min(2),
})

export function FooterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            province: "",
            message: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="flex items-center gap-3 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-white font-bold relative top-2">Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-[#4169E1] font-bold border-none text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-white font-bold relative top-2">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-[#4169E1] font-bold border-none text-white " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-white font-bold relative top-2">Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-[#4169E1] font-bold border-none text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-white font-bold relative top-2">Province</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-[#4169E1] font-bold border-none text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white font-bold relative top-2">Message</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="bg-[#4169E1] font-bold border-none resize-none h-32 no-scrollbar text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="bg-yellow-400 flex items-center p-[2px] w-fit gap-2 rounded-full">
                    <Button type="submit" className="bg-[#2E2BDF] hover:bg-[#2E2BDF] text-white font-bold py-2 px-5 rounded-full">
                        Submit
                    </Button>
                    <Button className="bg-white rounded-full cursor-none hover:bg-white"><FaArrowRightLong /></Button>
                </div>
            </form>
        </Form>
    )

}
