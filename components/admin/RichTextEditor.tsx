"use client";

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Undo, 
  Redo 
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageClick?: () => void;
  placeholder?: string;
}

const MenuBar = ({ editor, onImageClick }: { editor: any, onImageClick?: () => void }) => {
  if (!editor) return null;

  const toggleLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-[#f5f5f7] border-b border-apple-border rounded-t-2xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('underline') ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      
      <div className="w-[1px] h-4 bg-apple-border self-center mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      
      <div className="w-[1px] h-4 bg-apple-border self-center mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-black text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <button
        onClick={onImageClick}
        className="p-2 hover:bg-white rounded-lg text-apple-text-secondary transition-all"
        title="Insert image from Media"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      <button
        onClick={toggleLink}
        className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-blue-500 text-white' : 'hover:bg-white text-apple-text-secondary'}`}
      >
        <LinkIcon className="w-4 h-4" />
      </button>

      <div className="flex-1" />

      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-white rounded-lg text-apple-text-secondary">
        <Undo className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-white rounded-lg text-apple-text-secondary">
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, onImageClick, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-[32px] shadow-2xl border border-apple-border my-8 mx-auto block max-w-full',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-apple-accent underline underline-offset-4 cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base max-w-none focus:outline-none min-h-[300px] px-6 py-8 leading-relaxed font-serif text-lg text-apple-text',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-apple-border rounded-2xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-apple-accent transition-all">
      <MenuBar editor={editor} onImageClick={onImageClick} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
