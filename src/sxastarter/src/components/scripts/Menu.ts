let isOpenMenu = false;

function openMenu(event: any) {
  isOpenMenu = !isOpenMenu;

  const menuMobileNavigate = event.currentTarget as HTMLInputElement;
  menuMobileNavigate.checked = isOpenMenu;
}

export function handleToggleMenu(event: any, flag?: boolean): void {
  if (event) {
    const currentTarget = event.currentTarget as HTMLInputElement;
    if (currentTarget.dataset.isPageEditing) {
      event.preventDefault();
    }
  }

  if (flag !== undefined) {
    return openMenu(flag);
  }

  openMenu(!isOpenMenu);
}