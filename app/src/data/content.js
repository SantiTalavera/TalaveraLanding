import { DEMO_MODE } from './config'
import * as demo from './mock/content'
import * as production from './production'
import { selectClients, selectPortfolio } from './policy'

const content = DEMO_MODE ? demo : production
export const { clients, products, portfolio, navigation, footerLinks, socialLinks } = content
export { faqs } from './faqs'

export const visibleClients = selectClients(clients, DEMO_MODE)
export const visiblePortfolio = selectPortfolio(portfolio, DEMO_MODE)
