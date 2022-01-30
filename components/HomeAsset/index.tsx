export interface HomeAssetProps {
  className?: string;
  type?: string;
}
export default function HomeAsset({ className, type }: HomeAssetProps) {
  return (
    <div className={`my-2 p-2 text-xl font-semibold rounded-xl bg-custom-white-0 border-custom-white-0 text-custom-gray-1 cursor-pointer border-2 hover:bg-custom-gray-1 hover:text-custom-white-0 transition-colors ${className}`
} >{type}</div>
  )
}