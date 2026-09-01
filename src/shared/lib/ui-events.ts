/** Сворачивание сайдбара просят из полосы вкладок — состояние живёт в layout. */
export const TOGGLE_SIDEBAR_EVENT = 'ui:toggle-sidebar';

export const requestToggleSidebar = () => {
    window.dispatchEvent(new CustomEvent(TOGGLE_SIDEBAR_EVENT));
};
