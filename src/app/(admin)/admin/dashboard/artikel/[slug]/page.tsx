export default function DetailArtikel({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <>
      <div className=''>{params.slug}</div>
    </>
  )
}
