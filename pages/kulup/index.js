import Link from 'next/link'

export default function Kulup() {
  return (
    <div style={{padding:'20px'}}>
      <h1>Havacılık Kulübü</h1>
      <nav>
        <Link href="/Hubist.web/kulup/faaliyetler/" style={{marginRight:'10px'}}>
          Faaliyetler
        </Link>
        <Link href="/Hubist.web/kulup/blog/">
          Blog
        </Link>
      </nav>
    </div>
  )
}
