import Link from 'next/link'

export interface AssetCardProps {
  className?: string;
  type: string;
  assetId: string;
  assetName?: string;
  img: string;
  state: string;
}

export default function AssetCard({ className, type, assetId, assetName, img, state }: AssetCardProps) {
  const shadowColor = state == 'expired' ? 'shadow-custom-red' : state == 'needs-attention' ? 'shadow-custom-gold' : 'shadow-custom-green'
  return (
    <Link href={`/manage?itemName=${type?.toLowerCase()}&assetId=${assetId}`} >
      <div className={`cursor-pointer rounded-lg relative w-2/3 h-64 overflow-hidden shadow-lg ${shadowColor} ${className}`}>
        <img className='object-cover w-full h-full' src={img} alt={`Uploaded image for ${assetName}`}/>
        <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-gray-600 text-white text-center leading-4 text-lg">
          {assetName}
        </div>
      </div>
    </Link>
  )
}