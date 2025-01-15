export default function useVisibility(dom: Element, setVisible: (x: boolean, d: Element) => boolean, delay = 0) {
  let isVisible = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => isVisible = setVisible(true, dom), delay);
      } else {
        isVisible = setVisible(false, dom);
      }
    });
  });
  if (dom) {
    observer.observe(dom);
  }
  return isVisible;
}