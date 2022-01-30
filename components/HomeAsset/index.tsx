import Link from 'next/link'
export interface HomeAssetProps {
  className?: string;
  type?: string;
}
export default function HomeAsset({ className, type }: HomeAssetProps) {
  return (
    <Link href={`/manage?itemName=${type?.toLowerCase().replaceAll("\\w+", "%20")}`} >
      <div className={`custom-btn ${className}`}>{type}</div>
    </Link>
  )
}