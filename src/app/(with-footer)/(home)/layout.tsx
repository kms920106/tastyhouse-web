import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { MenuButton } from '@/components/layouts/header-parts'
import MenuSidebar from '@/components/layouts/MenuSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/shadcn/sidebar'
import Image from 'next/image'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <MenuSidebar />
      <SidebarInset>
        <Header height={83} showBorder={false}>
          <HeaderLeft>
            <MenuButton />
          </HeaderLeft>
          <HeaderCenter>
            <div className="relative w-[93px] h-[43px]">
              <Image
                src="/images/layout/header-logo.png"
                alt="로고"
                fill
                sizes="83px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </HeaderCenter>
        </Header>
        <div className="pb-[100px]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
