'use client'

import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
} from 'lucide-react'
import {
  useController,
  type Control,
  type FieldValues,
  type UseControllerProps,
  type UseControllerReturn,
} from 'react-hook-form'
import { useEffect } from 'react'
import { log } from 'console'

interface TiptapProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues> | any
  name: string
}
const Tiptap = ({ control, name }: TiptapProps<FieldValues>) => {
  const { field } = useController({ control, name })
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      HardBreak.configure({
        keepMarks: true,
      }),
    ],

    content: field.value,
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none p-4',
      },
    },
    editable: true,
    autofocus: false,
  })

  useEffect(() => {
    if (editor) {
      editor.commands.setParagraph()
    }
  }, [editor])

  if (!editor) null

  return (
    <div className='w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"'>
      <div className='control-group'>
        <div className='button-group font-medium w-fit'>
          <Button
            type='button'
            variant={
              editor?.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
            }
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              'size-5 p-4',
              editor?.isActive('heading', { level: 2 })
                ? 'is-active font-semibold'
                : ''
            )}>
            <Heading2 />
          </Button>
          <Button
            type='button'
            variant={
              editor?.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
            }
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              'size-5 p-4',
              editor?.isActive('heading', { level: 3 })
                ? 'is-active font-semibold'
                : ''
            )}>
            <Heading3 />
          </Button>
          <Button
            type='button'
            variant={editor?.isActive('bold') ? 'default' : 'ghost'}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn(
              'size-5 p-4',
              editor?.isActive('bold') ? 'is-active font-semibold' : ''
            )}>
            <Bold />
          </Button>
          <Button
            type='button'
            variant={editor?.isActive('italic') ? 'default' : 'ghost'}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={cn(
              'size-5 p-4',
              editor?.isActive('italic') ? 'is-active font-semibold' : ''
            )}>
            <Italic />
          </Button>
          <Button
            type='button'
            variant={editor?.isActive('highlight') ? 'default' : 'ghost'}
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
            className={cn(
              'size-5 p-4',
              editor?.isActive('highlight') ? 'is-active font-semibold' : ''
            )}>
            <Highlighter />
          </Button>
          <Button
            type='button'
            variant={editor?.isActive('bulletList') ? 'default' : 'ghost'}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              'size-5 p-4',
              editor?.isActive('bulletList') ? 'is-active font-semibold' : ''
            )}>
            <List />
          </Button>
          <Button
            type='button'
            variant={editor?.isActive('orderedList') ? 'default' : 'ghost'}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={cn(
              'size-5 p-4',
              editor?.isActive('orderedList') ? 'is-active font-semibold' : ''
            )}>
            <ListOrdered />
          </Button>
        </div>
      </div>

      <div className='overflow-y-scroll h-52 '>
        <EditorContent
          editor={editor}
          spellCheck={false}
          className='tiptap [&>:first-child]:mt-0 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h5]:text-sm [&_h6]:text-sm [&_h1]:leading-tight [&_h2]:leading-tight [&_h3]:leading-tight [&_h4]:leading-tight [&_h5]:leading-tight [&_h6]:leading-tight [&_ul]:pl-4 [&_ol]:pl-4 [&_ul]:my-5 [&_ol]:my-5 [&_ul]:mr-4 [&_ol]:mr-4 [&_ul_li_p]:my-[0.25em] [&_ol_li_p]:my-[0.25em] [&_ul]:list-disc [&_ol]:list-decimal [&_mark]:bg-primary-content [&_mark]:py-[.1rem] [&_mark]:px-[.3rem] [&_mark]:text-primary-accent'
        />
      </div>
    </div>
  )
}

export default Tiptap
