/** Apply content redirects after authentication and before Markdown page resolution. */
import { contentRedirectTarget, createContentRedirectLoader } from '../utils/content-redirects'
import { f0Config } from '../utils/f0-config'

const loadRedirects = createContentRedirectLoader()

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return
  const target = contentRedirectTarget(getRequestURL(event), await loadRedirects(f0Config().contentDir))
  if (target) return sendRedirect(event, target, 308)
})
