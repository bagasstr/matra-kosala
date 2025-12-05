'use client'
import DOMPurify from 'dompurify'

export const DisplayDetailContentArtikel = ({
  htmlContent,
}: {
  htmlContent: string | Node
}) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className='tiptap [&>:first-child]:mt-0 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h5]:text-sm [&_h6]:text-sm [&_h1]:leading-tight [&_h2]:leading-tight [&_h3]:leading-tight [&_h4]:leading-tight [&_h5]:leading-tight [&_h6]:leading-tight [&_ul]:pl-4 [&_ol]:pl-4 [&_ul]:my-5 [&_ol]:my-5 [&_ul]:mr-4 [&_ol]:mr-4 [&_ul_li_p]:my-[0.25em] [&_ol_li_p]:my-[0.25em] [&_ul]:list-disc [&_ol]:list-decimal [&_mark]:bg-primary-content [&_mark]:py-[.1rem] [&_mark]:px-[.3rem] [&_mark]:text-primary-accent [&_br]:mb-4'
    />
  )
}

export const DisplayCardContentArtikel = ({
  htmlContent,
}: {
  htmlContent: string
}) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className='tiptap [&>:first-child]:mt-0'
    />
  )
}
