import { Star, MessageCircle } from '@icons';
import { CONFIG } from '@shared/config';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';

const REVIEWS = [
  {
    name: 'Vincent',
    service: 'Head shave',
    quote: "One of the best saloons I've visited. Customer service and relationship is perfect — customers' consent is considered and the cut is perfect. Give it a try!",
    stars: 5,
  },
  {
    name: 'Adeola',
    service: 'Taper fade',
    quote: "It was an amazing experience. I had a very sweet time there plus I got exactly what I wanted. They paid real attention to my needs.",
    stars: 5,
  },
  {
    name: 'Oladipupo',
    service: 'Buzz fade',
    quote: "I had a wonderful time there. The stylist was gentle and great with communication.",
    stars: 5,
  },
  {
    name: 'Oluwafunmilayo',
    service: 'Hair colouring',
    quote: "I call them the doctor of hairline — they are really good at fixing hairlines. Short blue buzz fade, done perfectly.",
    stars: 5,
  },
  {
    name: 'Olaniyi',
    service: "Kids' cuts",
    quote: "The place was serene, the customer service was on point. I would recommend them anytime.",
    stars: 5,
  },
] as const;

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-volt fill-volt" aria-hidden="true" />
      ))}
    </div>
  );
}

function ReviewCard({ review, index, inView }: {
  readonly review: typeof REVIEWS[number];
  readonly index: number;
  readonly inView: boolean;
}) {
  const initials = review.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        'group relative bg-paper border border-hairline rounded-[14px] p-6 flex flex-col gap-5',
        'hover:border-volt/30 hover:shadow-[0_8px_40px_rgba(31,77,46,0.10)] transition-all duration-300',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      )}
      style={{ transitionDelay: `${index * 100}ms`, transitionDuration: '600ms' }}
    >
      {/* Volt accent top bar — grows on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] bg-volt rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />

      {/* Quote mark */}
      <div className="font-display font-extrabold text-[64px] text-volt/10 leading-none -mb-4 select-none" aria-hidden="true">
        "
      </div>

      {/* Review text */}
      <p className="font-body text-[15px] text-ink/80 leading-relaxed flex-1">
        {review.quote}
      </p>

      {/* Stars */}
      <StarRow />

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-hairline">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-volt text-white flex items-center justify-center font-mono font-bold text-[12px] shrink-0">
            {initials}
          </div>
          <div className="flex flex-col gap-0">
            <span className="font-display font-bold text-[14px] text-ink">{review.name}</span>
            <span className="font-mono text-[11px] text-steel uppercase tracking-wider">{review.service}</span>
          </div>
        </div>
        {/* Google badge */}
        <span className="font-mono text-[10px] text-steel/40 uppercase tracking-wider">Google</span>
      </div>
    </div>
  );
}

export function ReviewsScreen() {
  const { ref, inView } = useInView();
  const mapsUrl = CONFIG.contact.mapsUrl;

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 bg-bone border-t border-hairline">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={cn('flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="flex flex-col gap-3">
            <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
            <h2 className="font-display font-extrabold text-ink text-[clamp(32px,5vw,52px)] leading-[0.95] tracking-tight">
              What they say.
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            {/* Google rating summary */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-volt fill-volt" aria-hidden="true" />
                ))}
              </div>
              <span className="font-mono font-bold text-[15px] text-ink">5.0</span>
              <span className="font-body text-[14px] text-steel">on Google Maps</span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-volt uppercase tracking-widest hover:underline"
            >
              See all reviews →
            </a>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} inView={inView} />
          ))}

          {/* Add your review CTA card */}
          <div
            className={cn(
              'relative border-2 border-dashed border-hairline rounded-[14px] p-6 flex flex-col items-center justify-center gap-4 text-center',
              'hover:border-volt/40 hover:bg-volt-soft transition-all duration-300 cursor-pointer group',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ transitionDelay: '500ms', transitionDuration: '600ms' }}
          >
            <div className="w-12 h-12 rounded-full bg-volt-soft border border-volt/20 flex items-center justify-center group-hover:bg-volt group-hover:border-volt transition-colors duration-300">
              <MessageCircle size={20} className="text-volt group-hover:text-white transition-colors duration-300" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-[16px] text-ink">Had a great cut?</span>
              <span className="font-body text-[14px] text-steel">Leave a review on Google — it means a lot to Sam.</span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-volt uppercase tracking-widest hover:underline"
            >
              Review on Google →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
