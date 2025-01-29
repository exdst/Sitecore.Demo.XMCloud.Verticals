import useVisibility from "lib/useVisibility";

export default function SetVisibility(refs: NodeListOf<Element>){

    const setVisible = (x: boolean, dom: Element) => {
    if (x) {
      dom?.classList.add("is-visible");
    } else {
      dom?.classList.remove("is-visible");
    }
    return x;
  };

  refs.forEach((ref) => {
    const el = ref as HTMLElement;
    const delay: number = parseInt(el.dataset.delay ?? "0");
    useVisibility(ref as Element, setVisible, delay);
  });
}