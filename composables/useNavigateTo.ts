/**
 * A wrapper for navigateTo function that prevents ts asign errors
 * @param path the path to navigateTo
 * @returns
 */
export function useNavigateToOnClick(path: string): MouseEvent {
  navigateTo(path)
  return new MouseEvent('click')
}
