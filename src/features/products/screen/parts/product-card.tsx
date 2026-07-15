import { ShoppingBag } from '@icons';
import { cn } from '@shared/utils/cn';
import type { ProductConfig } from '@shared/config';

interface ProductCardProps {
  readonly product: ProductConfig;
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export function ProductCard({ product, style, className }: ProductCardProps) {
  return (
    <div
      style={style}
      className={cn(
        'group bg-paper border border-hairline rounded-[10px] overflow-hidden hover:border-volt/40 hover:shadow-[0_8px_32px_rgba(31,77,46,0.10)] transition-all duration-300',
        className,
      )}
    >
      {/* Photo area */}
      <div className="relative aspect-square bg-bone overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-volt opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        {product.photo != null ? (
          <img
            src={product.photo}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag size={32} className="text-steel/20" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-display font-bold text-[16px] text-ink leading-tight">{product.name}</span>
        <span className="font-body text-[13px] text-steel leading-snug">{product.blurb}</span>
        <span className="font-mono text-[11px] text-volt uppercase tracking-widest mt-2">Available in-store</span>
      </div>
    </div>
  );
}
