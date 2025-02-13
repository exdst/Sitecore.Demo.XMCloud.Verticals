export type ParallaxElementOptions = {
  translateY?: { from: number, to: number, units: "px" | "%" };
  scale?: { from: number, to: number };
  opacity?: { from: number, to: number };
}

export function useParallax(parallaxLayer: HTMLElement, options: ParallaxElementOptions, targetQuery?: string) {
  if (!parallaxLayer || !options) return;

  const parallaxContent = parallaxLayer.querySelector(
    targetQuery ?? ".parallax",
  ) as HTMLElement;

  function updateParallax() {

    const scrollPosition = window.scrollY;

    const contentTop =
      parallaxLayer!.getBoundingClientRect().top + scrollPosition;
    const contentHeight = parallaxLayer!.clientHeight;

    // Calculate how much the content has moved into view (from the top of the document to the scroll position)
    const contentVisibleProgress = Math.min(
      1,
      Math.max(
        0,
        (scrollPosition + window.innerHeight - contentTop) /
        (window.innerHeight + contentHeight),
      ),
    );

    let transformStyle = "";

    if (options.scale) {
      transformStyle += getScaleTransformation({
        minValue: options.scale.from,
        maxValue: options.scale.to
      }, contentVisibleProgress);
    }

    if (options.translateY) {
      transformStyle += getTranslateYTransformation(
        {
          minValue: options.translateY.from,
          maxValue: options.translateY.to,
          units: options.translateY.units
        }, contentVisibleProgress);
    }

    parallaxContent.style.transform = transformStyle;

    if (options.opacity) {
      parallaxContent.style.opacity = getOpacityTransformation(
        {
          minValue: options.opacity.from,
          maxValue: options.opacity.to
        }, contentVisibleProgress);
    }
  }

  const updateParallaxCallback = () => updateParallax();

  if (options.translateY && parallaxContent.style.backgroundImage) {
    parallaxContent.style.inset = getInset(parallaxContent,
      {
        minValue: options.translateY.from,
        maxValue: options.translateY.to,
        units: options.translateY.units
      });
  }

  // Intersection Observer to check if the parallax content is in the viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        updateParallaxCallback(); // Run once to set the initial values

        if (entry.isIntersecting) {
          window.addEventListener("scroll", updateParallaxCallback);
        } else {
          window.removeEventListener("scroll", updateParallaxCallback);
        }
      });
    },
    {
      root: null,
      threshold: 0, // Trigger when at least 0% of the content is visible
    },
  );

  observer.observe(parallaxContent);
}

function getTranslateYTransformation(options: { minValue: number, maxValue: number, units: "px" | "%" }, contentVisibleProgress: number): string {
  const diffValue = options.maxValue - options.minValue;
  const value = options.minValue + contentVisibleProgress * diffValue;

  return `translateY(${value}${options.units}) `;
}

function getScaleTransformation(options: { minValue: number, maxValue: number }, contentVisibleProgress: number): string {
  const diffValue = options.maxValue - options.minValue;
  const value = options.minValue + contentVisibleProgress * diffValue;

  return `scale(${value}) `;
}

function getOpacityTransformation(options: { minValue: number, maxValue: number }, contentVisibleProgress: number): string {
  const diffValue = options.maxValue - options.minValue;
  const opacity = options.minValue + contentVisibleProgress * diffValue;

  return opacity.toString();
}

function getInset(parallaxContent: HTMLElement, options: { minValue: number, maxValue: number, units: "px" | "%" }) {
  const parentHeight = parallaxContent.parentElement?.clientHeight ?? 0;

  let inset = 0;
  if (options.units === "px") {
    inset = (options.maxValue - options.minValue) / 2;
    return `${-1 * inset}px 0px ${-1 * inset}px 0px`;
  } else {
    inset = parentHeight * ((options.maxValue - options.minValue) / 100);
    return `${-1 * inset}px 0px 0px 0px`;
  }
}