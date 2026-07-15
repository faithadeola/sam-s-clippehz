import { Repeat } from 'meemaw';
import { CONFIG } from '@shared/config';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';
import { ProductCard } from './parts/product-card';

export function ProductsScreen() {
  const { ref, inView } = useInView();

  return (
    <section id="products" className="py-24 px-4 sm:px-6 bg-paper border-t border-hairline">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className={cn('flex flex-col gap-3 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
            <h2 className="font-display font-extrabold text-ink text-[clamp(32px,5vw,52px)] leading-[0.95] tracking-tight">
              The shop.
            </h2>
          </div>
          <p className={cn('font-body text-[15px] text-steel max-w-xs transition-all duration-700 delay-100', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            Clippers, pomades & hair products — the same tools behind every cut. Available to take home.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Repeat each={[...CONFIG.products]}>
            {(product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                className={cn(
                  'transition-all duration-700',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                )}
                style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
              />
            )}
          </Repeat>
        </div>

        {/* WhatsApp CTA */}
        <div className={cn('mt-10 text-center transition-all duration-700 delay-500', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
          <p className="font-mono text-[13px] text-steel/60 uppercase tracking-widest">
            Ask Sam's Clipperhz on WhatsApp for availability & pricing
          </p>
        </div>

      </div>
    </section>
  );
}
