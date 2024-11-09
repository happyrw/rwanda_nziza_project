"use client";
import Tiptap from '@/components/postCreation/tipTap/TipTap';
import React, { useEffect, useState } from 'react';

interface NotePickerProps {
    content?: string; // Add content as an optional prop
    onChange: (content: string) => void;
}

const NotePicker = ({ content = '', onChange }: NotePickerProps) => {
    const [internalContent, setInternalContent] = useState<string>(content);

    // Sync internalContent with the content prop when it changes externally
    useEffect(() => {
        setInternalContent(content);
    }, [content]);

    const handleContentChange = (newContent: string) => {
        setInternalContent(newContent);  // Update internal state
        onChange(newContent);  // Immediately pass content to the parent
    };

    return (
        <div className="w-full grid place-items-center mx-auto pt-5">
            <Tiptap
                content={internalContent} // Pass the current content to Tiptap
                onChange={handleContentChange} // Update on content change
            />
        </div>
    );
};

export default NotePicker;
