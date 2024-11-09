'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline"
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

import { Toolbar } from './Toolbar';

const Tiptap = ({
    content,
    onChange,
}: {
    content: string,
    onChange: (richText: string) => void,
}) => {

    const handleChange = (newContent: string) => {
        onChange(newContent);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-6", // You can adjust the class based on your styling needs
                }
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-6 auto-focus", // Similar styling for ordered list
                }
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: "border-l-4 border-gray-300 pl-4 italic text-gray-600", // Custom styling for blockquote
                }
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2],
                }
            }),
            Placeholder.configure({
                placeholder: "Start typing...",
                emptyEditorClass:
                    'cursor-text before:content-[attr(data-placeholder)] before:absolute  before:text-mauve-11 before:opacity-50 before-pointer-events-none',
            })
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "mx-auto shadow appearance-none min-h-[100px] border rounded max-w-[350px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[850px] py-2 px-3 bg-black text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
            },
        },
        onUpdate({ editor }) {
            handleChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content); // Update TipTap content when description changes
        }
    }, [content, editor]);

    return (
        <div className='w-full text-wrap sm:px-4 flex flex-col justify-stretch min-h-[250px] shadow shadow-slate-200'>
            <Toolbar editor={editor} content={content} />
            <EditorContent editor={editor} style={{ whiteSpace: "pre-line", position: "relative" }} />
        </div>
    )

}

export default Tiptap;