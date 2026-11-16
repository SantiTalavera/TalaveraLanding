import { DEMO_MODE } from './config'
import * as demo from './mock/content'
import * as production from './production'

const content = DEMO_MODE ? demo : production
export const { clients, products, faqs, navigation, footerLinks, socialLinks } = content
