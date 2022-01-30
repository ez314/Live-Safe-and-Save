export interface CircleSVGProps {
  className?: string;
  width?: number;
  height?: number;
}
export default function CircleSVG({ className, width, height }: CircleSVGProps) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
  )
}