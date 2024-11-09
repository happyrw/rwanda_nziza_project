"use client";
import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Quote,
    Undo,
    Redo,
    Code,
    Underline
} from "lucide-react";
// import { Toggle } from "./ui/toggle";

type Props = {
    editor: Editor | null,
    content: string
};

export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    };

    const activeButtonClass = "bg-sky-700 text-white p-2";
    const inactiveButtonClass = "text-black/15 p-2";

    return (
        <div className="relative -top-4 shadow shadow-slate-200 bg-white p-[5px] md:px-4 rounded-tl-md rounded-tr-md flex justify-start items-start gap-2 overflow-x-auto flex-nowrap">

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className={
                    editor.isActive("bold") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Bold className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={
                    editor.isActive("underline") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Underline className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={
                    editor.isActive("italic") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Italic className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={
                    editor.isActive("strike") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Strikethrough className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={
                    editor.isActive("heading", { level: 2 }) ? activeButtonClass : inactiveButtonClass
                }
            >
                <Heading2 className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={
                    editor.isActive("bulletList") ? activeButtonClass : inactiveButtonClass
                }
            >
                <List className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className={
                    editor.isActive("orderedList") ? activeButtonClass : inactiveButtonClass
                }
            >
                <ListOrdered className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={
                    editor.isActive("blockquote") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Quote className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().toggleCode().run();
                }}
                className={
                    editor.isActive("code") ? activeButtonClass : inactiveButtonClass
                }
            >
                <Code className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                }}
                className={inactiveButtonClass}
            >
                <Undo className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={(e: any) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                }}
                className={inactiveButtonClass}
            >
                <Redo className="h-3 md:h-5 w-3 md:w-5" />
            </Toggle>

        </div>
    );
}
