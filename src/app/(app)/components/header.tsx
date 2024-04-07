import { siteConfig } from '@/config/site'

export async function Header() {
  return (
    <header className="border-b py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl tracking-tight">
            {siteConfig.title}
          </h1>
        </div>
      </div>
    </header>
  )
}
