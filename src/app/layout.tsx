import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import ThemeProvider from '@/components/themeProvider'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'EsiPlan'
const APP_DEFAULT_TITLE = 'EsiPlan'
const APP_TITLE_TEMPLATE = '%s - EsiPlan'
const APP_DESCRIPTION = 'Emploi du temps des esisariens'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  // openGraph: {
  //   type: 'website',
  //   siteName: APP_NAME,
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
  // twitter: {
  //   card: 'summary',
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={
          inter.className + ' bg-white transition-colors dark:bg-dark-purple'
        }
      >
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
